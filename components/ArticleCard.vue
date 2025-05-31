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
    setLoaded();
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
})
</script>

<template>
    <div ref="cardRef" class="article-card">
        <div class="views">
            <Icon name="heroicons:eye" size="20" />
            <span>{{ props.articleInfo.views }}</span>
        </div>
        <div class="img-container">
            <img ref="imgRef">
        </div>
        <div class="meta-info">
            <h2 class="title">{{ props.articleInfo.title }}</h2>
            <p class="describ">{{ props.articleInfo.description }}</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.article-card {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 4px solid #000000;
    border-radius: 1.5rem 1.5rem 0 1.5rem;
    overflow: hidden;

    .views {
        position: absolute;
        top: .5rem;
        left: .5rem;
        color: white;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }

    .img-container {
        position: relative;
        width: 100%;
        min-height: 150px;

        img {
            width: 100%;
            object-fit: cover;
            vertical-align: middle;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .meta-info {
        padding: 0.5rem 1rem;
        background-color: #222222;

        .title {
            margin: 0;
            color: #929292;
            font-size: 1rem;
        }

        .describ {
            margin: 0;
            color: #AAAAAA;
            font-weight: bold;
            font-size: .8rem;
        }
    }
}
</style>
