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
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="zzz-loading_anim" />
    </div>
    <div v-else class="md:mx-8 md:my-20 sm:m-0 md:p-5 sm:p-2 text-xl text-white bg-[#1e1e1e] text-shadow-grey md:rounded-2xl sm:rounded-none border-4 border-black">
        <MarkdownPreview :markdown="cardDetail?.content" />
    </div>
</template>
<style lang="less" scoped>
.zzz-loading_anim {
    min-width: 110px;
    min-height: 150px;
    background: url("https://zamyang.cn/api/image/jSPGd73xHu4Tg7h9Z8NXzw.webp")
    no-repeat;
    background-position: 0 6px;
    animation: zzz-loading_loop 0.5s steps(30) infinite;
    filter: invert(1);
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
