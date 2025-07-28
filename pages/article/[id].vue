<script lang="ts" setup>
import { ref } from "vue";
import { articleInfoList } from "~/data/article";
import type { ArticleInfo } from "~/types/article";
const route = useRoute();
const router = useRouter();
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


import { gsap } from "gsap";

const goBack = () => {
  gsap.to('.back-button_pressed', {
    keyframes: [
      { opacity: 1, duration: 0.05 },
      { opacity: 0, duration: 0.05 }
    ],
    repeat: 3,
    onComplete: () => {
      router.back();
    }
  });
};
</script>

<template>
  <div class="relative min-h-[100vh] pt-20">
    <div class="back-button" @click="goBack" />
    <div class="back-button_pressed" />
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="min-w-[110px] min-h-[150px] bg-[url('/icon/zzz-loading.webp')] bg-no-repeat bg-[0 6px] animate-[zzz-loading-loop_.5s_steps(30)_infinite] invert" />
    </div>
    <div v-else class="md:mx-8 md:mb-20 md:p-5 sm:m-0 sm:p-2 text-xl text-white bg-[#1e1e1e] md:rounded-2xl sm:rounded-none border-4 border-black">
        <MarkdownPreview :markdown="cardDetail?.content" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.back-button {
  position: fixed;
  top: calc(var(--header-height) + 0.5rem);
  left: 0.25rem;
  width: 8rem;
  aspect-ratio: 2/1;
  background: url('/icon/back.webp') no-repeat;
  background-size: contain;
  cursor: pointer;
  z-index: 100;

  &:hover {
    filter: brightness(50%);
  }
}

.back-button_pressed {
  position: fixed;
  top: calc(var(--header-height) + 0.5rem);
  left: 0.25rem;
  width: 8rem;
  aspect-ratio: 2/1;
  background: url('/icon/back_pressed.webp') no-repeat;
  background-size: contain;
  opacity: 0;
  pointer-events: none;
  z-index: 101;
}
</style>