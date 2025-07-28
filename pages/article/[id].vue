<script lang="ts" setup>
import { ref } from "vue";
import { gsap } from "gsap";
import { articleInfoList } from "~/data/article";
import type { ArticleInfo } from "~/types/article";
const route = useRoute();
const router = useRouter();
const cardDetail = ref<ArticleInfo | undefined>(undefined);
const isLoading = ref(true);

const loadData = (id: number) => {
  isLoading.value = true;
  cardDetail.value = articleInfoList.find((article) => article.id === id);
  isLoading.value = false;
};

onBeforeMount(() => {
  if (route.params.id) {
    const articleId = Number(route.params.id);
    loadData(articleId);
  }
});

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

// ===== 图片放大预览 start =====
const imageSource = ref<string>('/img/玲.webp');
const isImageModalShow = ref<boolean>(false);

const closeImageModal = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      isImageModalShow.value = false;
      gsap.set('.close-button', { x: 0, opacity: 1 });
      gsap.set('.image-modal img', { x: 0, opacity: 1 });
    }
  })

  tl.to('.close-button_pressed', {
    keyframes: [
      { opacity: 1, duration: 0.03 },
      { opacity: 0, duration: 0.03 },
    ],
  }, 0);
  tl.to('.close-button', {
    x: -500,
    duration: 0.2,
    opacity: 0,
    ease: 'power2.in'
  }, '>0.02');
  tl.to('.image-modal img', {
    x: -500,
    duration: 0.2,
    opacity: 0,
    ease: 'power2.in'
  }, 0);
};

const showImageModal = (src: string) => {
  imageSource.value = src;
  const tl = gsap.timeline();
  tl.from('.image-modal img', {
    x: 200,
    duration: 0.2,
    opacity: 0,
    ease: 'power2.out'
  })
  tl.from('.close-button', {
    x: 200,
    duration: 0.2,
    opacity: 0,
    ease: 'power2.out'
  }, '<0.05');
  isImageModalShow.value = true;
};

const initImageCallback = () => {
  const images = document.querySelectorAll('.markdown-body img');
  images.forEach((img) => {
    img.addEventListener('click', () => {
      showImageModal((img as HTMLImageElement).src);
    })
  });
}

onMounted(() => {
  nextTick(() => {
    initImageCallback();
  })
})
// ===== 图片放大预览 end =====
</script>

<template>
  <div class="relative min-h-[100vh] pt-[var(--height-header)]">
    <div class="back-button" @click="goBack" />
    <div class="back-button_pressed" />
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="min-w-[110px] min-h-[150px] bg-[url('/icon/zzz-loading.webp')] bg-no-repeat bg-[0 6px] animate-[zzz-loading-loop_.5s_steps(30)_infinite] invert" />
    </div>
    <div v-else class="md:mx-8 md:mb-20 md:p-5 sm:m-0 sm:p-2 text-xl text-white bg-[#1e1e1e] md:rounded-2xl sm:rounded-none border-4 border-black">
        <MarkdownPreview :markdown="cardDetail?.content" />
    </div>

    <div v-show="isImageModalShow" class="image-modal">
      <div class="close-button" @click="closeImageModal" />
      <div class="close-button_pressed" />
      <img class="mx-auto mt-[var(--height-header)] mb-[var(--height-footer)] w-[80%] bg-contain border-8 border-black rounded-[0_var(--border-image-modal)_0_var(--border-image-modal)] z-[53]" :src="imageSource" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
.back-button {
  position: fixed;
  top: var(--height-header);
  left: 0;
  height: var(--height-header);
  aspect-ratio: 2/1;
  background: url('/icon/back.webp') no-repeat;
  background-size: contain;
  cursor: pointer;
  z-index: 50;

  &:hover {
    filter: brightness(50%);
  }
}

.back-button_pressed {
  position: fixed;
  top: var(--height-header);
  left: 0;
  height: var(--height-header);
  aspect-ratio: 2/1;
  background: url('/icon/back_pressed.webp') no-repeat;
  background-size: contain;
  opacity: 0;
  pointer-events: none;
  z-index: 51;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-top: var(--height-header);
  overflow-y: auto;
  backdrop-filter: blur(5px);
  z-index: 52;
  @space-between_modal: 6px;
  background: repeating-linear-gradient(40deg, rgba(0,0,0,.2) 0, rgba(0,0,0,.2) @space-between_modal, transparent @space-between_modal, transparent @space-between_modal * 2);

  .close-button {
    position: fixed;
    top: var(--height-header);
    right: 0;
    height: var(--height-header);
    aspect-ratio: 2/1;
    background: url('/icon/close.webp') no-repeat;
    background-size: contain;
    cursor: pointer;
    z-index: 0;
  }

  .close-button_pressed {
    position: fixed;
    top: var(--height-header);
    right: 0;
    height: var(--height-header);
    aspect-ratio: 2/1;
    background: url('/icon/close_pressed.webp') no-repeat;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  }
}
</style>