<script lang="ts" setup>
import { ref } from 'vue';
import { articleInfoList } from '~/data/article';
import type { ArticleInfo } from '~/types/article';
const route = useRoute();
const cardDetail: ArticleInfo | undefined = articleInfoList.find(article => article.id === Number(route.params.id));
if (!cardDetail) {
    throw new Error('Article not found');
}
const content = ref<string>(cardDetail.content || '');
</script>

<template>
    <div class="article">
        <MarkdownPreview :markdown="content" />
    </div>
</template>
<style lang="less" scoped>
.article {
    margin: 2rem auto;
    padding: 20px;
    font-size: 16px;
    color: white;
    background-color: #1e1e1e;
    border-radius: 2rem;
    filter:
        drop-shadow(-1px -1px #020202)
        drop-shadow(-1.5px 1.5px #020202)
        drop-shadow(1.5px -1.5px #020202)
        drop-shadow(3px 3px #020202);

    @media (max-width: 650px) {
        margin: 0;
        padding: .5rem;
        border-radius: 0;
    }
}
</style>

