<script lang="ts" setup>
import { ref } from "vue";
import { articleInfoList } from "~/data/article";
import type { ArticleInfo } from "~/types/article";
const route = useRoute();
const cardDetail = ref<ArticleInfo | undefined>(undefined);
const isLoading = ref(true);

const loadData = (id: string | string[]) => {
  isLoading.value = true;
  const numId = Number(id);
  cardDetail.value = articleInfoList.find((article) => article.id === numId);
  isLoading.value = false;
};

onBeforeMount(() => {
  if (route.params.id) {
    loadData(route.params.id);
  }
});
</script>

<template>
    <div class="article">
        <div v-if="isLoading" class="loading-container">
            <div class="zzz-loading_anim" />
        </div>
        <MarkdownPreview v-else :markdown="cardDetail?.content" />
    </div>
</template>
<style lang="less" scoped>
.article {
    margin: 2rem 5rem;
    padding: 20px;
    font-size: 16px;
    color: white;
    background-color: #1e1e1e;
    border-radius: 2rem;
    filter: drop-shadow(-1px -1px #020202)
        drop-shadow(-1.5px 1.5px #020202)
        drop-shadow(1.5px -1.5px #020202) 
        drop-shadow(3px 3px #020202);

    @media (max-width: 650px) {
        margin: 0;
        padding: 0.5rem;
        border-radius: 0;
    }
}

.loading-container {
    min-width: 110px;
    min-height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .zzz-loading_anim {
        min-width: 110px;
        min-height: 150px;
        background: url("https://zamyang.cn/api/image/jSPGd73xHu4Tg7h9Z8NXzw.webp")
        no-repeat;
        background-position: 0 6px;
        animation: zzz-loading_loop 0.5s steps(30) infinite;
        filter: invert(1);
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
</style>
