<script lang="ts" setup>
import { authorInfo } from '~/data/author';
</script>

<template>
    <div class="background">
        <div class="slide-container">
            <div class="text-container">
                <div class="text-line">{{ authorInfo.name }}'s Blog</div>
                <div class="text-line">'s Blog {{ authorInfo.name }}</div>
                <div class="text-line">{{ authorInfo.name }}'s Blog</div>
            </div>
            <div class="text-container-dst">
                <div class="text-line">{{ authorInfo.name }}'s Blog</div>
                <div class="text-line">'s Blog {{ authorInfo.name }}</div>
                <div class="text-line">{{ authorInfo.name }}'s Blog</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>

.background {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;

    &::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @space-between_bg: 3px;
        background: repeating-linear-gradient(40deg, rgba(0,0,0,.2) 0, rgba(0,0,0,.2) @space-between_bg, transparent @space-between_bg, transparent @space-between_bg * 2);
        opacity: 0.5;
    }

    .slide-container {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        animation: slide 100s linear infinite;


        .text-container,
        .text-container-dst {
            display: flex;
            flex-direction: column;
            width: max-content;
            height: min-content;
            font-weight: bolder;
            color: #242424;

            .text-line {
                font-size: 24rem;
                line-height: 24rem;
                overflow: hidden;
            }
        }
    }
}

@keyframes slide {
    0% {
        transform: translate(-50%, -50%) rotateZ(-15deg) translateX(25%);
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(-15deg) translateX(-25%);
    }
}
</style>
