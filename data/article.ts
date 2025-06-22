import type { ArticleInfo } from '@/types/article'

export const articleInfoList: ArticleInfo[] = [{
    id: 1,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp',
    ],
    content: `
# 一级标题 
## 二级标题 
### 三级标题 
#### 三级标题 

| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :-----: | -----: |
| 内容1 | 内容2 | 内容3 |
| 内容1 | 内容2 | 内容3 |

> 引用

行内代码：\`This is inline code\`

\`\`\`js
const handleCardKeyboardNavigation = (event: KeyboardEvent) => {
    event.preventDefault();
    const items = aboutInfo[activeIdx_Column.value]?.item[activeIdx_Row.value]?.item || [];
    const length = items.length;
    let newIndex = activeIdx_Card.value;

    switch (event.key) {
        case 'ArrowRight':
            newIndex = (newIndex + 1 + length) % length;
            break;
        case 'ArrowLeft':
            newIndex = (newIndex - 1 + length) % length;
            break;
    }
    activeIdx_Card.value = newIndex;
};
\`\`\`

公式：$x_2 + x_1 = x_3$

1. 有序列表
2. 有序列表
3. 有序列表

- 无序列表
- 无序列表
- 无序列表

图片：![](https://zamyang.cn/api/image/fLM4VKjrhBmarpXCquELMT.webp)
`
}, {
    id: 2,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/Q3uF2NrR6DYCmd46e3aHJp.webp',
    ],
}, {
    id: 3,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp',
    ],
}, {
    id: 4,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/Q3uF2NrR6DYCmd46e3aHJp.webp',
    ],
}, {
    id: 5,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/WNiMno6iXbEeeeNNPGRFSv.webp',
    ],
}, {
    id: 6,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp',
    ],
}, {
    id: 7,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp',
    ],
}, {
    id: 8,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/Q3uF2NrR6DYCmd46e3aHJp.webp',
    ],
}, {
    id: 9,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/WNiMno6iXbEeeeNNPGRFSv.webp',
    ],
}, {
    id: 10,
    title: '[资讯]强强联合？对空六课将协助虚拟实境系统开发',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp',
    ],
},
]