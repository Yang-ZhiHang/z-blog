<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { aboutInfo } from '~/data/about'
import type { AboutUnit } from '~/types/about'

const handleNavigate = (url: string) => {
    window.open(url, '_blank')
}

// ===== 条目式 start =====
const activeIdx_Column = ref<number>(0)
const activeIdx_Row = ref<number>(0)
const handleClick_Column = (index: number) => {
    activeIdx_Column.value = index
}
const handleClick_Row = (index: number) => {
    activeIdx_Row.value = index
}
// ===== 条目式 end =====

// ===== 卡片式 start =====
const activeIdx_Card = ref<number>(0)
const isLoading = ref(true)
const loadedImages = ref<Set<string>>(new Set())

const handleClick_Card = (index: number) => {
    activeIdx_Card.value = index
}

const handleCardKeyboardNavigation = (event: KeyboardEvent) => {
    event.preventDefault();
    const items = aboutInfo[activeIdx_Column.value]?.item[activeIdx_Row.value]?.item || [];
    const length = items.length;
    let newIndex = activeIdx_Card.value;

    switch (event.key) {
        case 'ArrowRight':
            newIndex = (newIndex + 1 + length) % length;
            break;
        case 'ArrowLeft':
            newIndex = (newIndex - 1 + length) % length;
            break;
    }
    activeIdx_Card.value = newIndex;
};
// ===== 卡片式 end =====

// 预加载图片
const preloadImages = (items: AboutUnit[]) => {
    isLoading.value = true
    loadedImages.value.clear()
    
    items.forEach(item => {
        const img = new Image()
        img.src = item.url
        img.onload = () => {
            loadedImages.value.add(item.url)
            if (loadedImages.value.size === items.length) {
                isLoading.value = false
            }
        }
    })
}

// 初始化时加载图片
onMounted(() => {
    const items = aboutInfo[activeIdx_Column.value]?.item[activeIdx_Row.value]?.item || []
    preloadImages(items)
})

// 全局键盘事件处理
const handleGlobalKeyboardEvent = (event: KeyboardEvent) => {
    if (aboutInfo[activeIdx_Column.value].title === '关于我') {
        handleCardKeyboardNavigation(event);
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeyboardEvent);
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleGlobalKeyboardEvent);
});

// 切换页面后重置卡片索引
watch([activeIdx_Column, activeIdx_Row], () => {
    activeIdx_Card.value = 0;
});
</script>

<template>
    <div class="book">
        <div class="book_nav">
            <ul class="absolute flex flex-row items-end justify-between px-4 bottom-1/2 gap-4 text-[#BBBBBB] font-bold italic">
                <li 
                    v-for="(item, idx) in aboutInfo" 
                    :key="idx"
                    class="px-[2.5rem] py-[.6rem] bg-[repeating-linear-gradient(110deg,transparent,transparent_4px,rgba(0,0,0,.02)_4px,rgba(0,0,0,.02)_15px),linear-gradient(150deg,#707070,#464646)] rounded-[.7rem_.7rem_0_0] text-shadow-black cursor-pointer hover:text-[#808080]"
                    :class="{ active: activeIdx_Column === idx }"
                    @click="handleClick_Column(idx)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class="book_projection"> 
            <!-- clip-path 放在 style 标签内，css 代码高亮会混乱 -->
            <div class="book_clip" style="clip-path: polygon(var(--clip-size) 0, 100% 0, 100% 100%, 0 100%, 0 var(--clip-size));">
                <div class="left-bar">
                    <div class="left-bar_clip" style="clip-path: polygon(calc(var(--clip-size) / 1.3) 0, 100% 0, 100% 100%, 0 100%, 0 calc(var(--clip-size) / 1.3));">
                        <ul class="flex flex-col items-center justify-start p-[0.4rem] w-full h-[85%] bg-[#4B4B4B] rounded-[0_0_1.5rem_1.5rem]">
                            <li
                                v-for="(item, idx) in aboutInfo[activeIdx_Column]['item']"
                                :key="idx"
                                class="relative p-[1.4rem] w-full text-[#AAAAAA] text-center text-shadow-grey font-bold italic cursor-pointer"
                                :class="{ active: activeIdx_Row === idx }"
                                @click="handleClick_Row(idx)"
                            >{{ item.title }}</li>
                        </ul>
                    </div>
                </div>
                <div class="right-part">
                    <div class="mt-[4rem] mb-[1.5rem] w-full h-full bg-[#141414] border-3xl shadow-[0_0_2px_black,0_0_4px_inset_black] rounded-[2rem]">
                        <div v-if="aboutInfo[activeIdx_Column].title === '关于我'" class="list-container_net-style">
                            <div v-if="isLoading" class="flex justify-center items-center w-full">
                                <div class="min-w-[110px] min-h-[150px] bg-[url('/icon/zzz-loading.webp')] bg-no-repeat bg-[0 6px] animate-[zzz-loading-loop_.5s_steps(30)_infinite] invert" />
                            </div>
                            <div v-else class="flex justify-between w-full h-full">
                                <ul class="flex flex-wrap content-start m-4 gap-[2.5%] w-full h-full">
                                    <li 
                                        v-for="(item, idx) in aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item']"
                                        :key="idx"
                                        class="w-[5rem]"
                                        :class="{ active: activeIdx_Card === idx }"
                                    >
                                        <div class="mb-1" @click="handleClick_Card(idx)">
                                            <img :src="item.url" class="relative block m-0 w-full border-[3px] border-solid border-[#3F3F3F] rounded-[var(--stack-card-border-radius)] cursor-pointer z-[1]">
                                        </div>
                                        <span class="block w-full py-1.5 px-0 text-center text-xs font-bold leading-3 text-white bg-black rounded-full cursor-pointer">
                                            {{ item.title }}
                                        </span>
                                    </li>
                                </ul>
                                <div class="card-detail">
                                    <div style="z-index: 2; padding: 1rem; width: 100%;">
                                        <div class="flex flex-row justify-between">
                                            <h1 class="font-bold text-3xl text-shadow-black">{{ aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].title }}</h1>
                                            <div>
                                                <img 
                                                    :src="aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].url"
                                                    class="w-[5rem] border-[var(--stack-card-border-radius)]"
                                                >
                                                <img class="absolute top-[2.5rem] right-[3rem] w-2/5 aspect-square z-[-1] grayscale-[1] opacity-[.3]" :src="aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].url">
                                            </div>
                                        </div>  
                                        <div class="mt-8 whitespace-pre-line indent-[2em]">
                                            <p v-for="(paragraph, index) in aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].description!.split('\n')" :key="index">
                                                {{ paragraph }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul v-else-if="aboutInfo[activeIdx_Column].title === 'Github'" class="list-container_linear-style">
                            <li
                                v-for="(item, idx) in aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item']"
                                :key="idx"
                                class="relative flex justify-between pl-4 w-full h-10 text-white bg-[linear-gradient(to_bottom,#404040,#303030)] rounded-[3rem] leading-10"
                            >
                                <span
                                    :title="item.title"
                                    class="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"
                                >
                                    {{ item.title }}
                                </span>
                                <button
                                class="absolute right-0 top-0 m-[.1rem] p-[2px] w-[8rem] h-[calc(100%-.2rem)] text-white bg-[linear-gradient(#080808,#080808),linear-gradient(#343434,#343434)] bg-clip-content border-2 border-[#080808] rounded-[2rem] leading-4 font-bold italic cursor-pointer hover:bg-[linear-gradient(#151515,#151515),linear-gradient(#343434,#343434)]"
                                @click.prevent="handleNavigate(item.url)"
                                >
                                    前往
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="book_page">
            <div class="absolute w-4/5 h-[99%] right-1 z-10 border-dashed border-[2px] rounded-[2rem] border-[rgba(0,0,0,0.3)]"/>
        </div>
    </div>
</template>

<style lang="less" scoped>

.book {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem auto;
    width: max-content;

    .book_nav {
        position: absolute;
        top: 0;
        right: 1.5rem;
        margin: 2rem 0 2rem 0;
        width: 75%;
        height: 2px;
        border: 3.5px solid black;
        border-radius: 1rem;
        box-shadow: -.2px 1px 1px rgba(255,255,255,.2);
        z-index: 1;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: .2rem;
            background: linear-gradient(to top, rgba(0, 0, 0, .5), transparent);
        }

        li.active {
            color: black;
            text-shadow: var(--text-shadow-none);
            padding: 1rem 2.5rem;
            background: repeating-linear-gradient(110deg, transparent, transparent 4px, rgba(0, 0, 0, .02) 4px, rgba(0, 0, 0, .02) 15px), linear-gradient(150deg, #FCD642, #D7B201);
        }
    }

    .book_projection {
        position: relative;
        width: 74rem;
        aspect-ratio: 2/1;
        filter:
            drop-shadow(-1px -1px #020202)
            drop-shadow(-1.5px 1.5px #020202)
            drop-shadow(1.5px -1.5px #020202)
            drop-shadow(3px 3px #020202);

        &::before {
            content: '';
            position: absolute;
            top: 5.3%;
            left: 1.1%;
            width: var(--clip-size);
            height: calc(var(--clip-size) / 1.6);
            background: linear-gradient(to bottom, black, #1e1e1e 5%, black);
            transform: rotate(-45deg);
            clip-path: polygon(
                0 100%, 7% 100%, 7% 90%, 14% 90%, 14% 0, 28% 0, 
                28% 100%, 35% 100%, 35% 90%, 42% 90%, 42% 0, 56% 0, 
                56% 100%, 63% 100%, 63% 90%, 70% 90%, 70% 0, 84% 0, 84% 100%
            );
            z-index: 1;
        }

        &::after {
            content: '';
            position: absolute;
            top: 14.5%;
            left: 3.4%;
            width: 1.3rem;
            height: .6rem;
            background: #333333;
            border-radius: 1px;
            box-shadow: 
                1.4rem 0 0 #333333,
                2.8rem 0 0 #333333;
            transform: rotate(-45deg);
            pointer-events: none;
        }

        .book_clip {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: end;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #404040, #2C2C2C);
            border-radius: 2rem;

            /* 仿粗糙材质 */
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 2rem;
                // background-image: url("/a.png");
                // background-size: 8px 8px;
                // mix-blend-mode: multiply;
                // opacity: 0.4;
                background-image: 
                    radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 2px),
                    radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 2px);
                background-size: 6px 6px;
                background-position: 0 0, 3px 3px;
                z-index: -1;
            }

            .left-bar {
                flex-shrink: 0;
                margin: 1.5rem;
                width: 18%;
                height: 90%;
                filter: drop-shadow(0 0 1px rgba(0, 0, 0, .3));

                .left-bar_clip {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    width: 100%;
                    height: 100%;
                    background-color: #646567;
                    border-radius: 1.5rem;

                    &::after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-image: 
                            radial-gradient(rgba(255, 255, 255, .03) .1px, transparent 1px),
                            radial-gradient(rgba(255, 255, 255, .03) .1px, transparent 1px);
                        background-size: 5px 5px;
                        background-position: 0 0, 2.5px 2.5px;
                        border-radius: 1.5rem;
                        z-index: 1;
                        pointer-events: none;
                        box-shadow: inset 0 0 2px rgba(0, 0, 0, .4);
                    }

                    li {
                        &:not(.active)::before {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translate(-50% , 0);
                            width: 80%;
                            height: 2px;
                            background-color: #414141;
                            border-radius: 1rem;
                            border-bottom: 1px solid #535353;
                        }

                        &.active {
                            color: white;
                            background: linear-gradient(-150deg, #1C89FE, #102ea7);
                            border-radius: .4rem;
                            text-shadow: var(--text-shadow-black);
                            font-weight: bold;
                            font-style: italic;
                            text-align: center;
                            box-shadow: 1px 1px 2px black;
                            border-bottom: none;
                            overflow: hidden;

                            &::before {
                                content: '';
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 400px;
                                height: 400px;
                                background: repeating-linear-gradient(
                                    60deg,
                                    rgba(255, 255, 255, 0.05) 0px,
                                    rgba(255, 255, 255, 0.05) 30px,
                                    transparent 30px,
                                    transparent 50px
                                );
                                animation: move-stripes 2s linear infinite;
                                pointer-events: none;
                            }
                        }
                    }
                }
            }

            .right-part {
                display: flex; 
                flex-direction: column; 
                width: 75%;
                margin: 0 1.5rem; 
                height: 100%;

                .list-container_net-style {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    width: 100%;
                    height: 100%;

                    .zzz-loading_anim {
                        margin: 0 auto;
                        min-width: 110px;
                        min-height: 150px;
                        background: url('/icon/zzz-loading.webp') no-repeat;
                        background-position: 0 6px;
                        animation: zzz-loading_loop .5s steps(30) infinite;
                        filter: invert(1);
                    }

                    li.active {
                        div {
                            position: relative;
                            &::after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 100%;
                                aspect-ratio: 1/1;
                                border-radius: var(--stack-card-border-radius);
                                animation: gradient-color 1.48s linear infinite, scale-bg .7s ease-in-out infinite;
                                z-index: 0;
                            }
                        }
                    }

                    .card-detail {
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        flex-shrink: 0;
                        margin: 1rem 1rem 1rem 0;
                        width: 40%;
                        color: white;
                        background: linear-gradient(to bottom, black 2rem, #222222 2rem, black 60%);
                        border: 3px solid #333333;
                        border-radius: 1rem;
                        overflow: auto;

                        &::before {
                            content: 'DETAIL';
                            display: block;
                            padding: .8rem 1rem 0 .8rem;
                            width: 100%;
                            color: #2C2C2C;
                            line-height: 1rem;
                            font-weight: bolder;
                            background-color: black;
                            border-radius: 2rem;
                            text-align: left;
                            box-sizing: border-box;
                            z-index: 2;
                        }

                        &::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: calc(100% - 2rem);
                            background-image: 
                                radial-gradient(rgba(0, 0, 0, .4) .2px, transparent 1.2px), 
                                radial-gradient(rgba(0, 0, 0, .4) .2px, transparent 1.2px); 
                            background-size: 5px 5px;
                            background-position: 0 0, 2.5px 2.5px;
                            z-index: 1;
                        }
                    }
                }

                .list-container_linear-style {
                    display: flex;
                    flex-direction: column;
                    gap: .8rem;
                    margin: .8rem 1rem;
                    width: calc(100% - 2rem);
                    text-shadow: var(--text-shadow-black);
                    font-weight: bold;
                }
            }
        }
    }

    .book_page {
        position: absolute;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 10%;
        height: 100%;
        background: linear-gradient(to bottom, #3a3a3a, #202020);
        border-radius: 2rem;
        border: 3.5px solid black;
        right: -2rem;
        z-index: -1;
        
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 2rem;
            background-image: 
                radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 2px),
                radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 2px);
            background-size: 6px 6px;
            background-position: 0 0, 3px 3px;
            z-index: -1;
        }
    }
}

@keyframes move-stripes {
    0% {
        transform: translateX(0) translateY(0);
    }
    100% {
        transform: translateX(-29px) translateY(50.23px);  /* 25*cot(60deg) = 43.3 */
    }
}

@keyframes scale-bg {
    0% {
        transform: translate(-50%, -50%) scale(1.02);
    }
    5%, 50% {
        transform: translate(-50%, -50%) scale(1.08);
    }
    100% {
        transform: translate(-50%, -50%) scale(1.02);
    }
}

@keyframes gradient-color {
    0% {
        background-color: var(--flicker-color-1);
    }

    50% {
        background-color: var(--flicker-color-2);
    }

    100% {
        background-color: var(--flicker-color-1);
    }
}
</style>