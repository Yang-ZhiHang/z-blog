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
        <div class="min-w-[110px] min-h-[150px] bg-[url('/img/zzz-loading.webp')] bg-no-repeat bg-[0 6px] animate-[zzz-loading-loop_.5s_steps(30)_infinite] invert" />
    </div>
    <div v-else class="md:mx-8 md:my-20 sm:m-0 md:p-5 sm:p-2 text-xl text-white bg-[#1e1e1e] text-shadow-grey md:rounded-2xl sm:rounded-none border-4 border-black">
        <MarkdownPreview :markdown="cardDetail?.content" />
    </div>
</template>