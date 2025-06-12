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
            <ArticleCard
                v-for="(articleInfo, idx) in articleInfoList" :key="idx" :article-info="articleInfo"
                class="article-card" :style="{ animationDelay: `${0.05 * idx}s` }" 
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.article {
    margin: 2rem;
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
            background: url('https://zamyang.cn/api/image/jSPGd73xHu4Tg7h9Z8NXzw.webp') no-repeat;
            background-position: 0 6px;
            animation: zzz-loading_loop .5s steps(30) infinite;
            filter: invert(1);
        }
    }

    .article-list {
        display: grid;
        align-items: start;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;

        .article-card {
            animation: fade-in 0.1s ease-in-out forwards;
            opacity: 0;
        }
    }
}

@keyframes zzz-loading_loop {
    0% {
        background-position: 0 6px;
    }

    100% {
        background-position: 0 -4494px;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
