<script lang="ts" setup>
import { ref } from "vue";
import { articleInfoList } from "~/data/article";
import type { ArticleInfo } from "~/types/article";
const route = useRoute();
const router = useRouter();
const cardDetail = ref<ArticleInfo | undefined>(undefined);
const isLoading = ref(true);

const goBack = () => {
  router.back();
};

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
  <div class="relative min-h-[100vh] pt-20">
    <div class="fixed top-[calc(var(--header-height)+.5rem)] left-1 w-32 aspect-[2/1] bg-[url('/icon/back.webp')] bg-no-repeat bg-contain cursor-pointer z-10 hover:brightness-50" @click="goBack" />
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="min-w-[110px] min-h-[150px] bg-[url('/icon/zzz-loading.webp')] bg-no-repeat bg-[0 6px] animate-[zzz-loading-loop_.5s_steps(30)_infinite] invert" />
    </div>
    <div v-else class="md:mx-8 md:mb-20 md:p-5 sm:m-0 sm:p-2 text-xl text-white bg-[#1e1e1e] md:rounded-2xl sm:rounded-none border-4 border-black">
        <MarkdownPreview :markdown="cardDetail?.content" />
    </div>
  </div>
</template>