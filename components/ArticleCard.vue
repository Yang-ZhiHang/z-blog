<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ArticleInfo } from '~/types/article';
import { ref, onMounted, inject } from 'vue';

const props = defineProps({
    articleInfo: {
        type: Object as PropType<ArticleInfo>,
        required: true
    }
})

const router = useRouter();

const gotoArticle = (id: number): void => {
    router.push(`/article/${id}`);
}

const imageLoaded = ref<boolean>(false);
const cardRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLElement | null>(null);
const { setLoaded } = inject('articleLoading') as { setLoaded: () => void };

const updateCardHeight = (): void => {
    if (cardRef.value) {
        const rows = Math.ceil(cardRef.value.clientHeight / 20) + 1;
        cardRef.value.style.gridRowEnd = `span ${rows}`;
    }
}

const loadImage = () => {
    if (imgRef.value && !imageLoaded.value) {
        imgRef.value.addEventListener('load', () => {
            imageLoaded.value = true;
            updateCardHeight();
        });
        imgRef.value.setAttribute('src', props.articleInfo.cover_url_list[0]);
    }
}

onMounted(() => {
    loadImage();
    setLoaded();
})
</script>

<template>
    <article 
        ref="cardRef" 
        class="relative flex-col border-4 border-black rounded-[1.5rem_1.5rem_0_1.5rem] overflow-hidden cursor-pointer transition-all duration-200 opacity-0 animate-[fade-in_0.1s_ease-in-out_forwards] hover:border-[var(--flicker-color-2)]" 
        @click="gotoArticle(props.articleInfo.id)"
    >
        <div class="flex absolute items-center top-2 left-2 text-white z-[1] gap-2 font-[.9rem]">
            <Icon name="heroicons:eye" size="20" />
            <span>{{ props.articleInfo.views }}</span>
        </div>
        <div class="relative w-full after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.8%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23noiseFilter%29%27%2F%3E%3C%2Fsvg%3E')] after:mix-blend-overlay after:opacity-50 after:pointer-events-none">
            <img ref="imgRef" class="w-full object-cover align-middle">
        </div>
        <div class="py-2 px-4 bg-[#222222]">
            <h2 class="m-0 text-[#929292] font-bold line-clamp-2 overflow-hidden text-ellipsis">{{ props.articleInfo.title }}</h2>
            <p class="m-0 text-[#AAAAAA] text-[.8rem] font-bold">{{ props.articleInfo.description }}</p>
        </div>
    </article>
</template>