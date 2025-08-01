# Z-BLOG

> 本项目供学习交流使用，有问题欢迎联系 zamyang@qq.com

## 简介

绝区零是米哈游旗下的一款次元养成类游戏。

本项目 Z-BLOG 是基于 Vue3+Nuxt 的开源博客前端界面，使用 Z-BLOG 的开发者可以搭建自己的静态博客网站，或者根据自己的需要搭建后端结合使用。

文章列表中的图片取自小红书。

## 页面预览

![](https://raw.githubusercontent.com/Yang-ZhiHang/z-blog/master/demo/文章.webp)

![](https://raw.githubusercontent.com/Yang-ZhiHang/z-blog/master/demo/关于.webp)

![](https://raw.githubusercontent.com/Yang-ZhiHang/z-blog/master/demo/图片预览.webp)

## 功能特点

- [x] 复刻绝区零的绳网、快速手册等样式
- [x] 文章列表支持懒加载
- [x] 支持通过配置文件统一修改网站信息

## 快速开始

在当前目录下打开终端，输入以下命令并回车：

1. 安装项目依赖

```bash
pnpm install
```

2. 在本地运行项目

```bash
pnpm run dev
```

项目启动成功后，在浏览器中输入 `localhost:3000` 进入即可预览。

## 技术栈

- Vue3
- Nuxt
- TailwindCSS

项目中的 Tailwind 主要用于处理不需要语义化的标签，如 `h1`、`span`、`p` 等。

而对于需要高度定制化样式的标签，推荐使用 LESS 而非 TailwindCSS。

最后，欢迎提 issue 或 PR