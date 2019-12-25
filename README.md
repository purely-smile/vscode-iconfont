## iconfont

本插件目前仅内部使用，部分依赖需要后续依赖开源才可以公开使用。

![截图1](./docs/imgs/img1.png)

## 特色

1. vscode 内部管理当前项目的`iconfont`
2. 支持复制`icon_class`
3. 支持刷新功能

## 安装

1. 安装`download-iconfont`依赖: `npm install @tal/download-iconfont -g`
2. 配置`puppeteer 镜像`: `npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`
3. 安装`puppeteer`: `npm install puppeteer -g`
4. 项目中`command+shift+p`: 输入 `set iconfont`，找到命令，回车，输入项目的 iconfont Id
5. 重启项目查看效果

## 已知问题

1. 登录引导，目前下载`iconfont`需要具备登录状态，新用户需要手动在终端执行以下命令来同步登录状态：`download-iconfont -p <项目id>`

TODO

1. 支持文件内 icon 回显
2. 集成 icon 智能提示
3. 集成更新`iconfont`功能
4. 自动安装依赖，增加容错提示。
