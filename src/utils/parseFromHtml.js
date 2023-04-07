// utils -> parseFromHtml

import { stripTags, truncate, unique, pipe } from 'bellajs'

import { purify, cleanify } from './html.js'

import {
  isValid as isValidUrl,
  purify as purifyUrl,
  absolutify as absolutifyUrl,
  normalize as normalizeUrls,
  chooseBestUrl,
  getDomain
} from './linker.js'

import extractMetaData from './extractMetaData.js'

import extractWithReadability, {
  extractTitleWithReadability
} from './extractWithReadability.js'

import { execPreParser, execPostParser } from './transformation.js'

import getTimeToRead from './getTimeToRead.js'

const summarize = (desc, txt, threshold, maxlen) => { // eslint-disable-line
  return desc.length > threshold
    ? desc
    : truncate(txt, maxlen).replace(/\n/g, ' ')
}

// inputHtml: html 字符串
// inputUrl:  请求的 url
// parserOptions: 选项
export default async (inputHtml, inputUrl = '', parserOptions = {}) => {
  // 净化 html , 删除注释、特定标签、属性等
  const html = purify(inputHtml)
  // 获取 meta 全部信息
  const meta = extractMetaData(html)

  // 拿meta的title作为标题
  // ! 这个地方有点问题, 有些不按标准来的就不对了
  let title = meta.title

  const {
    url,
    shortlink,
    amphtml,
    canonical,
    description: metaDesc,
    image: metaImg,
    author,
    published,
  } = meta

  const {
    // wordsPerMinute：数字，估计阅读时间。默认300。
    wordsPerMinute = 300,
    // descriptionTruncateLen：数字，为描述生成的最大字符数。默认210。
    descriptionTruncateLen = 210,
    // descriptionLengthThreshold：数字，描述所需的最少字符数。默认180。
    descriptionLengthThreshold = 180,
    // contentLengthThreshold：数字，内容所需的最小字符数。默认200。
    contentLengthThreshold = 200,
  } = parserOptions

  // gather title  // ! 如果上面没搞到title就阅读模式库里搞一个, 这两个好像本质上就是一个
  if (!title) {
    title = extractTitleWithReadability(html, inputUrl)
  }
  if (!title) {
    return null
  }

  // gather urls to choose the best url later
  // 国内站点，基本上这里一定是 inputUrl // TODO ！！23-4-7
  const links = unique(
    [url, shortlink, amphtml, canonical, inputUrl]
      .filter(isValidUrl)
      .map(purifyUrl)
  )

  console.log(links) // ! 23-4-7 看到这里

  if (!links.length) {
    return null
  }

  // choose the best url, which one looks like title the most
  const bestUrl = chooseBestUrl(links, title)

  const fns = pipe(
    (input) => {
      return normalizeUrls(input, bestUrl)
    },
    (input) => {
      return execPreParser(input, links)
    },
    (input) => {
      return extractWithReadability(input, bestUrl)
    },
    (input) => {
      return input ? execPostParser(input, links) : null
    },
    (input) => {
      return input ? cleanify(input) : null
    }
  )

  const content = fns(html)

  if (!content) {
    return null
  }

  const textContent = stripTags(content)
  if (textContent.length < contentLengthThreshold) {
    return null
  }

  const description = summarize(
    metaDesc,
    textContent,
    descriptionLengthThreshold,
    descriptionTruncateLen
  )

  const image = metaImg ? absolutifyUrl(bestUrl, metaImg) : ''

  return {
    url: bestUrl,
    title,
    description,
    links,
    image,
    content,
    author,
    source: getDomain(bestUrl),
    published,
    ttr: getTimeToRead(textContent, wordsPerMinute),
  }
}
