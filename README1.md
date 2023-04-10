# 文本提取思路

1. 通过 cross-fetch 接口拿到url所有html字符串
2. 通过 sanitize-html 净化html，获取到干净的html字符串
3. 通过 linkedom 把html实例化，获得document对象，进行操作
   1. 可以用jsdom来替换linkedom. 不过jsdom性能没有linkedom好。虽然jsdom更重，但是社区活跃度更高
4. title 默认取 meta 里的。如果没有，就 @mozilla/readability 格式化 html 后获取 title
   1. **这里有问题，万一 meta 里有值，但是不是正确的，就不会走格式化 html 逻辑了**
   2. @mozilla/readability mozilla 提供给火狐的阅读模式的独立库
5. string-similarity （字符串相似度, 时间复杂度O(n)），用这个库去对比 title 和 url ，来确定最优的地址。（国内站点不适合这一步）
6. 处理页面中的相对地址，使用 readability 提取文章，处理提取的html中的空白符，拿到最终的文章

**核心是 @mozilla/readability 库** 

## @mozilla/readability

基于 arc90 的可读性项目，开发的提取文章信息的库。

> arc90 是纽约的一家软件公司，最著名的产品就是Readability

目前可读性团队的代码是闭源的。 [可读性团队官网](https://www.readability.com/read)中能找到他们的相关论证。
   
> 算法大体思路为由定义的一系列正则 + 常用标签和文字的加减权重，最后根据权重来重新拼接内容后获得文章的内容 

Readability工作流程:
* 1。 通过删除脚本标签、css等来准备文档。
* 2。 构建可读性的DOM树。
* 3。 从当前dom树中获取文章内容。
* 4。 用新的DOM树替换当前的DOM树。
* 5。 完成。

> 针对中文的处理没有那么好，例如 标题的提取、相对路径的转换、GBK\GB2312编码等。不过node移植的版本实现了这些。

目前收集到的比较好的移植版本为：

* node 版本1：https://github.com/luin/readability
* node 版本2：https://github.com/mozilla/readability
* php 版本：https://github.com/feelinglucky/php-readability
* go 版本：https://github.com/go-shiori/go-readability
* Python 版本：https://github.com/timbertson/python-readability

**mozilla和luin对readability实现的对比**

@mozilla/readability

* 核心文件最后提交2023-4-1
* npm周下载量 18959
* 5.8k star
* mozilla 团队维护

node-readability

* 核心文件最后提交2017-8-8
* npm周下载量 2290
* 2.4k star
* 个人维护者

**@mozilla/readability更好一些**

## eol的提取思路

readability （95%）+ 行业固定模板（5%）？怎么确保这5%能够被匹配？
