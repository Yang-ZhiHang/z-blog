<script lang="ts" setup>
import { articleInfoList } from '~/data/article';
import { ref, provide } from 'vue';

const isLoading = ref(true);
provide('articleLoading', {
    isLoading,
    setLoaded: () => isLoading.value = false
});
</script>

<template>
    <div class="article">
        <div v-if="isLoading" class="loading-container">
            <div class="zzz-loading_anim" />
        </div>
        <div v-show="!isLoading" class="article-list">
            <ArticleCard v-for="(articleInfo, index) in articleInfoList" :key="index" :article-info="articleInfo" class="article-card" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.article {
    margin: 6rem 2rem;
    position: relative;
    min-height: 300px;

    .loading-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .zzz-loading_anim {
            min-width: 110px;
            min-height: 150px;
            background: url('/zzz-loading.png') no-repeat;
            background-position: 0 6px;
            animation: zzz-loadingLoop .5s steps(30) infinite;
            filter: invert(1);
        }
    }

    .article-list {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(5, calc(100% / 5 - 1rem));
        justify-content: space-around;
        gap: 20px;
    }
}

@keyframes zzz-loadingLoop {
    0% {
        background-position: 0 6px;
    }

    100% {
        background-position: 0 -4494px;
    }
}
</style>
