// import { extract } from '@extractus/article-extractor'
import { extract } from '../src/main.js'

// ! article-extractor 测试

// ! 文案在内置pdf中，提取不到 ？ 或者是因为有延迟渲染才拿不到？  可以通过 extractFromHtml() 来获取
// const url = 'https://physics.nju.edu.cn/xwgg/gg/20230404/i242037.html' 
// ! 文案非常短的，默认提取不到. contentLengthThreshold 设置小一些就可以。但是会出现误差。
// ! title中的标题不正确
const url = 'https://xsxy.nju.edu.cn/jyjx/rcpy/20201126/i170797.html'
// ! gbk编码的
// const url = 'http://www.acac.cn/index.php?m=content&c=index&a=show&catid=41&id=4705'
// const url = 'https://gaokao.eol.cn/jiang_xi/dongtai/202212/t20221222_2262478.shtml?proId=36'
// const url = 'https://www.tsinghua.edu.cn/info/2195/94420.htm'
// const url = 'https://www.hezeu.edu.cn/info/1061/12023.htm'
// const url = 'https://www.tsinghua.edu.cn/info/1181/60298.htm'
// const url = 'https://physics.nju.edu.cn/xwgg/qnjssl/20230316/i240330.html'

try {
  const data = await extract(url, {
    contentLengthThreshold: 20,
  })
  console.log(data)
} catch (err) {
  console.error("出错了：", err)
}