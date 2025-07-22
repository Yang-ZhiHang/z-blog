<script lang="ts" setup>
import { articleInfoList } from '~/data/article';
import { ref, provide, onMounted } from 'vue';

const isLoading = ref(true);
const displayCount = ref(10);

const loadMore = () => {
  if (displayCount.value < articleInfoList.length) {
    displayCount.value += 10;
    displayCount.value = Math.min(displayCount.value, articleInfoList.length);
  }
};

const handleWindowScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMore();
    }
};

// 懒加载
onMounted(() => {
  window.addEventListener('scroll', handleWindowScroll);
});

// 等待子组件图片加载完成后才能渲染瀑布流
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
                v-for="(articleInfo, idx) in articleInfoList.slice(0, displayCount)" :key="idx" :article-info="articleInfo"
                class="article-card" :style="{ animationDelay: `${0.02 * idx}s` }" 
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.article {
    margin: 2rem auto;
    padding: 0 2rem;
    position: relative;
    max-width: 1400px;
    min-height: 100vh;

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

        @media (max-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 650px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 450px) {
            grid-template-columns: 1fr;
        }

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
