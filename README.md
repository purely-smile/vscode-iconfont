## iconfont

本插件目前仅内部使用，部分依赖需要后续依赖开源才可以公开使用。

![截图1](./docs/imgs/img1.png)

## 特色

1. vscode 内部管理当前项目的`iconfont`
2. 支持复制`icon_class`
3. 支持刷新功能
4. 支持`icon`回显功能和背景高亮（颜色可配置）
5. 支持智能输入提示
6. 支持的语言: `vue`、`html`、`javascript`、`typescript`、`css`

## 安装

1. 安装`download-iconfont`依赖: `npm install @tal/download-iconfont -g`
2. 配置`puppeteer 镜像`: `npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`
3. 安装`puppeteer`: `npm install puppeteer -g`
4. 项目中`command+shift+p`: 输入 `set iconfont`，找到命令，回车，输入项目的 iconfont Id
5. 重启项目查看效果

## 配置

1. `iconfont.projectId`: 配置 iconfont 的项目 id，必须配置
2. `iconfont.highlight.bgColor`: icon 高亮背景色配置。参考 https://www.bootcss.com/p/websafecolors/

## 已知问题

1. 登录引导，目前下载`iconfont`需要具备登录状态，新用户需要手动在终端执行以下命令来同步登录状态：`download-iconfont -p <项目id>`
2. 由于`completions`限制，目前无法支持`icon`图标的展示

TODO

1. 集成更新`iconfont`功能
2. 自动安装依赖，增加容错提示。
3. 智能输入提示增加 icon 图标

## 参考资料:

1. [VSCode 扩展开发(十) TreeView](http://lilpig.site/post/vscode-ext10)
2. [tree-view-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample)
3. [vscode-todo-highlight](https://github.com/wayou/vscode-todo-highlight)
4. [插件开发（四）：Decorations 装饰器](https://github.com/whdlut/vscode/blob/master/35%20!%20%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%EF%BC%88%E5%9B%9B%EF%BC%89%EF%BC%9ADecorations%20%E8%A3%85%E9%A5%B0%E5%99%A8.md)
5. [vscode-iconfont-preview](https://github.com/jasonslyvia/vscode-iconfont-preview/blob/master/src/extension.ts)
6. [decorator-sample](https://github.com/microsoft/vscode-extension-samples/blob/master/decorator-sample/src/extension.ts#L70)
7. [completions-sample](https://github.com/microsoft/vscode-extension-samples/blob/master/completions-sample/src/extension.ts)
