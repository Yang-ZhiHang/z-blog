import type { ArticleInfo } from '@/types/article'

const demo_md = `
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

![](/img/安比·德玛拉.webp)
`

export const articleInfoList: ArticleInfo[] = [{
    id: 1,
    title: '[安比]',
    description: '噔噔噔噔噔噔噔噔噔噔~',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/安比·德玛拉.webp',
    ],
    content: demo_md
}, {
    id: 2,
    title: '[玲]',
    description: '今天天气挺不错~',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/玲.webp',
    ],
    content: `![](/img/玲.webp)`
}, {
    id: 3,
    title: '[青衣]',
    description: '谢谢！是我丢的手...表。您...舔这一下也是在流程内的吗？',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/青衣.webp',
    ],
    content: `![](/img/青衣.webp)`
}, {
    id: 4,
    title: '[薇薇安]',
    description: '日安，法尔同大人~',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/薇薇安·班希.webp',
    ],
    content: `![](/img/薇薇安·班希.webp)`
}, {
    id: 5,
    title: '[简]',
    description: '这次，想让我用什么身份陪你？',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/简·杜.webp',
    ],
    content: `![](/img/简·杜.webp)`
}, {
    id: 6,
    title: '[橘福福]',
    description: '呜哇~师姐来咯！',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/橘福福.webp',
    ],
    content: `![](/img/橘福福.webp)`
},{
    id: 7,
    title: '[柚叶]',
    description: '今天不上课哦~',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/浮波·柚叶.webp',
    ],
    content: `![](/img/浮波·柚叶.webp)`
}, {
    id: 8,
    title: '[安比的电钻]',
    description: 'mhy出联动怎么没和我说呀喂！',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/安比的电钻.webp',   
    ],
    content: `![](/img/安比的电钻.webp)`
},  {
    id: 9,
    title: '[雅]',
    description: '我将继续此道，直到找到我的星辰。',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/星见·雅.webp',
    ],
    content: `![](/img/星见·雅.webp)`
}, {
    id: 10,
    title: '[资讯] 强强联合？对空六课将协助 FANTA 代言',
    description: '今天，空洞调查协会正式向外...',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/星见·雅代言.webp',
    ],
    content: `![](/img/星见·雅代言.webp)`
}, {
    id: 11,
    title: '你瞅啥?',
    description: '',
    views: 9100,
    create_time: '2025-01-01 10:00:00',
    modified_time: '2025-01-02 12:00:00',
    cover_url_list: [
        'img/薇薇安·班希-你瞅啥.webp',
    ],
    content: `![](/img/薇薇安·班希-你瞅啥.webp)`
},
]