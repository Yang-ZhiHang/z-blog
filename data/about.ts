import type { AboutGroup } from '~/types/about'

export const aboutInfo: AboutGroup[] = [
    {
        title: '关于我',
        item: [
            {
                title: '技术栈',
                item: [
                    {
                        title: 'Git',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Git.svg',
                        description: 'Git，代码版本管理工具，支持分支管理、代码合并和远程协作。'
                    },
                    {
                        title: 'Vue',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/VueJS-Dark.svg',
                        description: '一个 JavaScript 框架，采用组件化开发方式，具有双向数据绑定、虚拟 DOM 等特性。\nVue 的单文件组件（SFC）特性使得 HTML、CSS、JS 均能在一个文件中编写。'
                    },
                    {
                        title: 'TypeScript',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg',
                        description: 'TypeScript 是 JavaScript 的超集，添加了静态类型系统。它提供了严格的类型检查，以便于在编程过程中发现问题。'
                    },
                    {
                        title: 'Docker',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Docker.svg',
                        description: 'Docker 是一个容器化平台，用于构建、部署和运行应用程序。它通过容器技术实现环境隔离和快速部署。'
                    },
                    {
                        title: 'FastAPI',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/FastAPI.svg',
                        description: '一个 Python 框架，一般用于构建 Web 应用的后端。相比于 Flask 提供了更高的性能、易用的 API。'
                    },
                    {
                        title: 'PostgreSQL',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PostgreSQL-Dark.svg',
                        description: 'PostgreSQL 是一个功能强大的开源关系型数据库，社区庞大。'
                    },
                ]
            },
            {
                title: "栏目2",
                item: [
                    {
                        title: 'Rust',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Rust.svg',
                        description: 'Rust，一种编程语言。'
                    },
                    {
                        title: 'MySQL',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MySQL-Dark.svg',
                        description: 'MySQL 是一种数据库服务。'
                    },
                    {
                        title: 'React',
                        url: 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg',
                        description: 'React 是目前主流的前端框架之一。'
                    },
                ]
            }
        ],
    },
    {
        title: 'Github',
        item: [
            {
                title: '开源项目',
                item: [
                    {
                        title: 'xiaozhi-webui: 一个基于 Vue3 实现的 Web 版小智 AI，已完成文字聊天、语音聊天，欢迎 PR',
                        url: 'https://github.com/yang-zhihang/xiaozhi-webui'
                    },
                ]
            },
            {
                title: "栏目2",
                item: [
                    {
                        title: 'nfc-stc-pn532: 基于 STC89C52 和 PN532 集成 NFC 模块的宿舍智能门禁系统',
                        url: 'https://github.com/yang-zhihang/nfc-stc-pn532'
                    },
                ]
            }
        ]
    }
]