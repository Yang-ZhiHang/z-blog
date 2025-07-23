<script lang="ts" setup>
import { authorInfo } from '~/data/author';

const birthday = new Date(authorInfo.birth);
const today = new Date();

const seconds = today.getTime() - birthday.getTime();
const days = Math.ceil(seconds / (1000 * 60 * 60 * 24));

const level = Math.floor(days / 365);
const currentExp = days;
const totalExp = (level + 1) * 365;
const expPercentage = (currentExp / totalExp) * 100;
</script>

<template>
    <div class="author">
        <div class="h-full aspect-square border-[3px] border-black rounded-full overflow-hidden shrink-0">
            <img class="w-full h-full object-cover" :src="authorInfo.avatar" alt="User Avatar">
        </div>
        <div class="flex max-[312px]:hidden grow flex-col justify-center gap-[.2rem]">
            <div class="mb-[.2rem] leading-4 text-[1rem] font-bold">{{ authorInfo.name }}</div>
            <div class="exp-bar">
                <div class="absolute top-[-1px] left-[-1px] h-[calc(100%+2px)] bg-gradient-to-r from-[#4663fd] to-[#14c7ff] rounded-[.4rem]" :style="{ width: expPercentage + '%' }" />
                <div class="absolute top-1/2 left-0 -translate-y-1/2 text-[1rem] leading-4 text-white z-[1]">{{ currentExp }}/{{ totalExp }}</div>
            </div>
        </div>
        <div class="flex flex-col items-center mr-4 ml-2 shrink-0">
            <div class="leading-[1.8rem] text-[1.8rem] font-black">{{ level }}</div>
            <div class="leading-[.6rem] text-[.6rem] text-[rgba(255,255,255,.6)]">LEVEL</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.author {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    margin: .5rem 1rem;
    width: max-content;
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

    .exp-bar {
        position: relative;
        width: 180px;
        height: 1rem;
        background: linear-gradient(90deg, #222222, #222222), linear-gradient(#141414, #2A2A2A);
        background-origin: padding-box, border-box;
        background-clip: padding-box, border-box;
        border: 2px solid transparent;
        border-radius: 0.4rem;

        @media (max-width: 400px) {
            width: 100px;    
        }
    }
}
</style>
