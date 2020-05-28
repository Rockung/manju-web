# 文殊Web(manju-web)

一款组织Markdown文档为静态网站的简单工具。[查看演示](https://rockung.gitee.io/). 

## 缘起

放在文档夹下的Markdown文件多了就会产生一个问题，没有一个统一的大纲。尽管像[typora](https://www.typora.io), [marktext](https://github.com/marktext/marktext)这样的Markdown编辑器有大纲，还可以打一个文件夹，用起来也很方便，但要把文档放在网上浏览，就有问题了。像博客软件[hexo](https://github.com/hexojs/hexo)，文档网站[docusaurus](https://github.com/facebook/docusaurus)，都支持Markdown文档，但要跑起来，必须配置服务器，不是很方便。

开放课程项目Mr.ABC需要一款制作课件的简单工具。即使对程序员来说，WEB已经变得异常复杂，对知识整理工作者更不友好。Markdown的简单易用，和MathJax，Mermaid及Vega的等DSL的出现，可以让课件制作变得简单。

文殊Web是一款小工具，只要按照一定规则书写Markdown文件，把文档夹放在一个http服务器下，它就变成了一个静态文档网站。当然了，这个网站的结构就没有那么灵活了。

> 受[mardown_nav](https://github.com/chris-peng/markdown_nav)和[itoc](https://github.com/itnik/itoc)启发。

## 原理

网站是由index.html文件引导的，index.html中引用的脚本文件manju-web.js被加载
到浏览器中，manju-web.js下载**index.md**文件，做为Markdown文档的起点。

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

网站结构采用经典的三栏式布局：上边是导航菜单，中间是三栏式布局（左侧导航条、中间内容区、右侧文档目录），底部区域放置网站的版权等信息。

### 菜单文件

菜单文件的结构和引导文件类式，导航菜单采用二级结构。

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

## 用法

文档制作者下载：manju-web-start-xxx.zip

开发者可克隆：git clone https://gitee.com/rockung/manju-web.git