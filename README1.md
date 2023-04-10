# 文本提取思路

1. 通过 cross-fetch 接口拿到url所有html字符串
2. 通过 sanitize-html 净化html，获取到干净的html字符串
3. 通过 linkedom 把html实例化，获得document对象，进行操作
4. title 默认取 meta 里的。如果没有，就 @mozilla/readability 格式化 html 后获取 title
   1. **这里有问题，万一 meta 里有值，但是不是正确的，就不会走格式化 html 逻辑了**
   2. @mozilla/readability mozilla 提供给火狐的阅读模式的独立库
5. string-similarity （字符串相似度, 时间复杂度O(n)），用这个库去对比 title 和 url ，来确定最优的地址。（国内站点不适合这一步）
6. 处理页面中的相对地址，使用 readability 提取文章，处理提取的html中的空白符，拿到最终的文章

**核心是 @mozilla/readability 库** 

## @mozilla/readability

