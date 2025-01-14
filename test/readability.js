
// import { Readability } from '@mozilla/readability'
import { Readability } from '../../readability/index.js'
import { DOMParser } from 'linkedom'
import { isString } from 'bellajs'

const run = (html, inputUrl = '') => {
  if (!isString(html)) {
    return null
  }
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const base = doc.createElement('base')
  base.setAttribute('href', inputUrl)
  doc.head.appendChild(base)
  const reader = new Readability(doc, {
    keepClasses: true,
    // debug: true
  })
  const result = reader.parse() ?? {}
  return result
  // return result.textContent ? result.content : null
}

const url = 'https://xsxy.nju.edu.cn/jyjx/rcpy/20201126/i170797.html'
const html = '<!DOCTYPE html>\n<html lang="en">\n\n  <head>\n    <meta charset="utf-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">\n    <meta name="renderer" content="webkit" />\n    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />\n    <link rel="stylesheet" href="/DFS//template/2515/images/base.css">\n    <title>新生学院 ｜ 人才培养</title>\n    \x3Cscript type="text/javascript" src="/njdx/front/ui/jquery/jquery.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/jquery/jquery.base64.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/boshan/ui.js" data-appurl="/njdx">\x3C/script><link type="text/css" rel="stylesheet" href="/njdx/front/ui/page/info.css?v=v4.0.2"/><link type="text/css" rel="stylesheet" href="/njdx/front/ui/page/channel.css?v=v4.0.2"/>\x3Cscript type="text/javascript" src="/njdx/front/ui/visit/visit.js?s=146&c=10403&v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/jwplayer/jwplayer.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/jwplayer/bs.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/pdf/build/pdf.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/pdf/showpdf.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/layer/layer.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/layer/bs.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/template/es5-shim.min.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/template/es5-sham.min.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/template/template-web.js?v=v4.0.2">\x3C/script>\x3Cscript type="text/javascript" src="/njdx/front/ui/template/template-bs.js?v=v4.0.2">\x3C/script>\n    <link rel="stylesheet" href="/DFS//template/2539//images/wzy.css">\n  </head>\n\n  <body>\n\n    \x3C!-- 头部信息 -->\n    \x3Cscript src="/DFS//template/2515/images/header.js">\x3C/script>\n\n    <div class="g-mn warp">\n      <div class="b-channel">\n        <div class="channel"><img src="/DFS//template/2515/images/base_9.png">人才培养</div>\n        <div class="subChannel"><a href="http://xsxy.nju.edu.cn"> 首页 </a> > <a href="http://xsxy.nju.edu.cn/jyjx/index.html">教育教学</a> > <a href="http://xsxy.nju.edu.cn/jyjx/rcpy/index.html">人才培养</a></div>\n      </div>\n\n      <div class="m-ctx">\n        <div class="title">大类培养学科分流、专业准入实施方案一览表（2020修订版）</div>\n        <div class="control">\n          <div class="fbsj">发布时间：2020-11-26</div>\n          <div class="wzdx">字体：【<span>小</span><span>中</span><span>大</span>】</div>\n        </div>\n        <div class="content"><p><span style="font-family: 微软雅黑,Microsoft YaHei; font-size: 16px;"><br/></span></p><p style="text-align: left;"><a title="大类培养分流实施方案一览表（2020修订版）" style="color: rgb(0, 102, 204); font-size: 16px; text-decoration: underline;" href="/njdx/DFS//file/2020/11/26/20201126154535360ulzs36.pdf"><span style="font-size: 16px;">大类培养分流实施方案一览表（2020修订版）</span></a><p><a title="大类培养分流实施方案一览表（2020修订版）" style="color: rgb(0, 102, 204); font-size: 16px; text-decoration: underline;" href="/njdx/DFS//file/2020/11/26/20201126154535360ulzs36.pdf"><span style="font-family: 微软雅黑,Microsoft YaHei; font-size: 16px;"><br/></span></a></p><p><a title="专业准入实施方案一览表（2020修订版）" style="color: rgb(0, 102, 204); font-size: 16px; text-decoration: underline;" href="/njdx/DFS//file/2020/11/26/20201126154548790k6f2z4.pdf"><span style="font-size: 16px;">专业准入实施方案一览表（2020修订版）</span></a></p><p></p><p><span style="font-family: 微软雅黑,Microsoft YaHei; font-size: 16px;"></span></p></p></div>\n        <div class="updown"><div id="upanddown"></div>\x3Cscript type="text/javascript" src="/njdx/front/ui/upanddown/upanddown.js?infoid=170797">\x3C/script></div>\n      </div>\n\n    </div>\n\n    \x3Cscript src="/DFS//template/2515/images/footer.js">\x3C/script>\n    \n    \x3Cscript>\n      function changeSize(px) {\n        $(".m-ctx .content").css({"font-size" : px + "px", "line-height": (10 + parseInt(px)) + "px"});\n        $(".m-ctx .content p").css({"font-size" : px + "px", "line-height": (10 + parseInt(px)) + "px"});\n        $(".m-ctx .content span").css({"font-size" : px + "px", "line-height": (10 + parseInt(px)) + "px"});\n        $(".m-ctx .content div").css({"font-size" : px + "px", "line-height": (10 + parseInt(px))+ "px"});      \n      }\n      var bar = document.querySelector(".m-ctx .wzdx");\n      bar.addEventListener("click", function(event) {\n        switch(event.target.innerText){\n          case "小":\n            changeSize(14);\n            break;\n          case "中":\n            changeSize(16);\n            break;\n          case "大":\n            changeSize(18);\n            break;\n          default:\n            break;\n        }\n      })\n    \x3C/script>\n  </body>\n\n</html>'

const c = run(html, url)

console.log(c)
