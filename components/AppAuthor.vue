<script lang="ts" setup>
import { computed, ref } from 'vue';
import { authorInfo } from '~/data/author';

const startDate = new Date(authorInfo.birth);
const today = new Date();
const timeDiff = today.getTime() - startDate.getTime();
const level = computed(() => {
    const years = timeDiff / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
});

const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
const currentExp = ref(daysDiff);
const totalExp = computed(() => (level.value + 1) * 365);
const expPercentage = computed(() => {
    return (currentExp.value % 365 / 365) * 100;
}); // 生日后的经验值百分比
</script>

<template>
    <div class="author">
        <div class="avatar">
            <img :src="authorInfo.avatar" alt="User Avatar">
        </div>
        <div class="info">
            <div class="username">{{ authorInfo.name }}</div>
            <div class="exp-bar">
                <div class="exp-progress" :style="{ width: expPercentage + '%' }" />
                <div class="exp-text">{{ currentExp }}/{{ totalExp }}</div>
            </div>
        </div>
        <div class="level">
            <div class="level-number">{{ level }}</div>
            <div class="level-label">LEVEL</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.author {
    display: flex;
    align-items: center;
    margin: 1rem;
    width: 300px;
    height: 3rem;
    background: linear-gradient(0, #151515, #222222), linear-gradient(0, #161616, #353535);
    background-origin: padding-box, border-box;
    background-clip: padding-box, border-box;
    border-radius: 2rem;
    border: solid 3px transparent;
    color: white;
    font-family: sans-serif;
    gap: 0.5rem;
    cursor: default;

    .avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 3px solid black;
        overflow: hidden;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.2rem;

        .username {
            margin-bottom: 0.2rem;
            line-height: 1rem;
            font-size: 1rem;
            font-weight: bold;
        }

        .exp-bar {
            position: relative;
            width: 100%;
            height: 0.8rem;
            background: linear-gradient(90deg, #222222, #222222), linear-gradient(#141414, #2A2A2A);
            background-origin: padding-box, border-box;
            background-clip: padding-box, border-box;
            border: 2px solid transparent;
            border-radius: 0.4rem;
            overflow: hidden;

            .exp-progress {
                height: 100%;
                background: linear-gradient(to right, #4663FD, #14C7FF);
                border-radius: 0.4rem;
            }

            .exp-text {
                position: absolute;
                top: 50%;
                left: 25%;
                transform: translate(-50%, -50%);
                font-size: 1rem;
                line-height: 1rem;
                color: white;
                z-index: 1;
            }
        }
    }

    .level {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1rem 0 .5rem;
        flex-shrink: 0;

        .level-number {
            line-height: 1.8rem;
            font-size: 1.8rem;
            font-weight: 900;
        }

        .level-label {
            line-height: 0.6rem;
            font-size: 0.6rem;
            color: rgba(255, 255, 255, 0.6);
        }
    }
}
</style>
