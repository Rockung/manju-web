# 文殊Web(manju-web)

一款组织[Markdown](https://guides.github.com/features/mastering-markdown/)文档为静态网站的简单工具。[这里查看演示](https://rockung.gitee.io/). 

## 由来

开发者喜欢用Markdown编写技术文档，放在文档夹下的Markdown文件多了就会产生一个问题，没有一个统一的大纲。尽管像[typora](https://www.typora.io), [marktext](https://github.com/marktext/marktext)这样的Markdown编辑器对单个文档有大纲，你也还可以打一个文件夹来查看你的现有文档，用起来也很方便，但要把文档放在网上浏览，就有些问题。

而像博客软件[hexo](https://github.com/hexojs/hexo)，文档网站[docusaurus](https://github.com/facebook/docusaurus)，都支持Markdown文档，做成站点。但要跑起来，必须下载工具软件[node.js](https://nodejs.org)，配置服务器，这是专业人士做的事情了。

开放课程项目Mr.ABC需要一款简单灵活地制作课件的工具，要求对普通的知识工作者容易上手。现在，WEB技术已经变得异常复杂了，即使对程序员来说，也是如此，对知识工作者更加不友好。Markdown，简单易用；除了支持数学公式语言LaTex的[MathJax](https://www.mathjax.org)外，[Mermaid](http://mermaid-js.github.io/mermaid/)、[Vega](https://vega.github.io/vega)的等各类DSL的出现，可以让课件制作变得更加简单。

**文殊Web**是一款小工具，帮助你用Markdown语言组织的你的Markdown文档。只要按照一定规则书写Markdown文件，把文档夹放在一个**HTTP服务器**下，它就变成了一个静态文档网站。

> 如果玩过前端，你有一打HTTP服务器，到www.npmjs.com搜`http server`。
> 
> 如果想玩玩前端，不妨从这里开始：
> - linux或Mac用户： https://github.com/nvm-sh/nvm
> - windows用户： https://github.com/coreybutler/nvm-windows
> 
> 编辑器可用
> - vscode: https://code.visualstudio.com/Download
> 
> 受[mardown_nav](https://github.com/chris-peng/markdown_nav)和[itoc](https://github.com/itnik/itoc)启发。

## 如何工作的？

通常，网站是由**index.html**文件引导的。index.html中引用的脚本文件manju-web.js被加载到浏览器后，成为主角，下载并解释**index.md**文件，做为Markdown文档的起点。

### 引导文件

index.md文件的结构如下：

```md
# menu

- [Home](home.md)
- [Products](products.md)

# contents

Here is markdown for the home page
```

- \# menu部分：形成网站的菜单条
- \# contents部分：形成网站的首页内容

### 网站结构

网站结构采用经典的三栏式布局：上边是菜单，中间是三栏式布局（左侧导航条、中间内容区、右侧文档目录），底部区域放置网站的版权等信息。

### 菜单项文件

菜单项文件的结构和引导文件类式，导航条采用二级结构。

```md
# menu

- Get Started
 - [Installation](install.md)
 - Creating your site
 - Publishing your site
- Guides
 - Adding a Blog
 - Custom Pages

# contents

Here is markdown for the home page
```

- \# menu部分：形成导航条
- \# contents部分：形成网站的内容

## 用法

文档制作者：可去[releases](https://gitee.com/rockung/manju-web/releases)，下载`manju-web-start-xxx.zip`，解压到你的文档根目录即可。

开发者：可克隆`git clone https://gitee.com/rockung/manju-web.git`
```bash
npm install
npm run dev
```
