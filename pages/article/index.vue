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
    <div class="relative my-8 mx-auto max-w-[80%] min-h-[100vh]">
        <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="zzz-loading_anim" />
        </div>
        <div v-show="!isLoading" class="grid items-start gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            <ArticleCard
                v-for="(articleInfo, idx) in articleInfoList.slice(0, displayCount)" :key="idx" :article-info="articleInfo"
                :style="{ animationDelay: `${0.02 * idx}s, 0s` }" 
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.zzz-loading_anim {
    min-width: 110px;
    min-height: 150px;
    background-image: url('/icon/zzz-loading.webp');
    background-repeat: no-repeat;
    background-position: 0 6px;
    animation: zzz-loading_loop .5s steps(30) infinite;
    filter: invert(1);
}

@keyframes zzz-loading_loop {
    0% {
        background-position: 0 6px
    }
    100% {
        background-position: 0 -4494px
    }
}
</style>