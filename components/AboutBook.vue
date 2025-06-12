<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { aboutInfo } from '~/data/about'

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
        <div class="nav">
            <ul>
                <li 
                    v-for="(item, idx) in aboutInfo" 
                    :key="idx"
                    :class="{ active: activeIdx_Column === idx }"
                    @click="handleClick_Column(idx)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class="book_projection">
            <div class="book_clip">
                <div class="left-bar">
                    <div class="left-bar_clip">
                        <ul>
                            <li
                                v-for="(item, idx) in aboutInfo[activeIdx_Column]['item']"
                                :key="idx"
                                :class="{ active: activeIdx_Row === idx }"
                                @click="handleClick_Row(idx)"
                            >{{ item.title }}</li>
                        </ul>
                    </div>
                </div>
                <div class="right-container">
                    <div class="content">
                        <div class="card-list-container" v-show="aboutInfo[activeIdx_Column].title === '关于我'">
                            <ul class="card-style">
                                <li 
                                    v-for="(item, idx) in aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item']"
                                    :key="idx"
                                    :class="{ active: activeIdx_Card === idx }"
                                >
                                    <div class="img-container" @click="handleClick_Card(idx)">
                                        <img :src="item.url" alt="Card Image" />
                                    </div>
                                    <span>{{ item.title }}</span>
                                </li>
                            </ul>
                            <div class="card-detail">
                                <div style="z-index: 2; padding: 1rem; width: 100%;">
                                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                                        <span>{{ aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].title }}</span>
                                        <div class="img-container">
                                            <img :src="aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].url" alt="Card Detail Image" />
                                            <img class="shadow" :src="aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].url" alt="Card Detail Image" />
                                        </div>
                                    </div>
                                </div>
                                <div style="z-index: 2; padding: 1rem; width: 100%;">
                                    <p class="description">{{ aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item'][activeIdx_Card].description }}</p>
                                </div>
                            </div>
                        </div>
                        <ul class="itemized-style" v-show="aboutInfo[activeIdx_Column].title === 'Github'">
                            <li
                                v-for="(item, idx) in aboutInfo[activeIdx_Column]['item'][activeIdx_Row]['item']"
                                :key="idx"
                            >
                                <span :title="item.title">
                                    {{ item.title }}
                                </span>
                                <button @click.prevent="handleNavigate(item.url)">
                                    前往
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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

    .nav {
        position: absolute;
        top: 0;
        right: 1.5rem;
        margin: 2rem 0 2rem 0;
        width: 75%;
        height: 2px;
        border: 3.5px solid black;
        border-radius: 1rem;
        z-index: 1;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: .2rem;
            background: linear-gradient(to top, rgba(0, 0, 0, .5), transparent);
        }

        ul {
            position: absolute;
            bottom: 50%;
            display: flex;
            flex-direction: row;
            align-items: end;
            justify-content: space-between;
            padding: 0 1rem;
            gap: 1rem;
            color: #BBBBBB;
            text-shadow: 
                -1.3px -1.3px #000,
                -1.3px 1.3px #000,
                1.3px 1.3px #000;
            font-weight: bold;
            font-style: italic;

            li {
                padding: .6rem 2.5rem;
                background: repeating-linear-gradient(110deg, transparent, transparent 4px, rgba(0, 0, 0, .02) 4px, rgba(0, 0, 0, .02) 15px), linear-gradient(150deg, #707070, #464646);
                border-radius: .7rem .7rem 0 0;
                cursor: pointer;

                &:hover {
                    color: #808080;
                }

                &.active {
                    color: black;
                    text-shadow: none;
                    padding: 1rem 2.5rem;
                    background: repeating-linear-gradient(110deg, transparent, transparent 4px, rgba(0, 0, 0, .02) 4px, rgba(0, 0, 0, .02) 15px), linear-gradient(150deg, #FCD642, #D7B201);
                }
            }
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
            background: linear-gradient(to bottom, #3a3a3a, #202020);
            border-radius: 2rem;
            clip-path: polygon(var(--clip-size) 0, 100% 0, 100% 100%, 0 100%, 0 var(--clip-size));

            // 仿粗糙材质
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 2rem;
                background-image: 
                    radial-gradient(#343434 .2px, transparent 1.2px),
                    radial-gradient(#343434 .2px, transparent 1.2px);
                background-size: 5px 5px;
                background-position: 0 0, 2.5px 2.5px;
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
                    clip-path: polygon(calc(var(--clip-size) / 1.3) 0, 100% 0, 100% 100%, 0 100%, 0 calc(var(--clip-size) / 1.3));
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
                        z-index: 1;
                        border-radius: 1.5rem;
                        pointer-events: none;
                    }

                    ul {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        padding: .4rem .2rem;
                        width: 100%;
                        height: 85%;
                        background-color: #4B4B4B;
                        border-radius: .5rem .5rem 1.5rem 1.5rem;
                        gap: .4rem;
                        box-shadow: 0 -1px 2px rgba(0, 0, 0, .2);

                        li {
                            position: relative;
                            padding: 1.4rem;
                            width: 100%;
                            color: #AAAAAA;
                            text-shadow: 
                                -1.3px -1.3px 0 #414141,
                                -1.3px 1.3px 0 #414141,
                                1.3px 1.3px 0 #414141;
                            font-weight: bold;
                            font-style: italic;
                            text-align: center;
                            cursor: pointer;
                            
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
                                background: linear-gradient(-120deg, #1C89FE, #2D4ED5);
                                border-radius: .4rem;
                                text-shadow: 
                                    -1.3px -1.3px #000,
                                    -1.3px 1.3px #000,
                                    1.3px 1.3px #000;
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
            }

            .right-container {
                display: flex; 
                flex-direction: column; 
                width: 75%;
                margin: 0 1.5rem; 
                height: 100%;

                .content {
                    margin: 4rem 0 1.5rem 0;
                    width: 100%;
                    height: 100%;
                    background-color: #141414;
                    border-radius: 2rem;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .7), 0 0 8px inset black;

                    .card-list-container {
                        display: flex;
                        justify-content: space-between;
                        flex-direction: row;
                        width: 100%;
                        height: 100%;

                        .card-style {
                            display: flex;
                            align-content: flex-start;
                            flex-wrap: wrap;
                            margin: 1rem;
                            gap: 2.5%;
                            height: 100%;

                            li {
                                width: 18%;

                                &.active .img-container {
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

                                .img-container {
                                    margin-bottom: .2rem;
                                    img {   
                                        position: relative;
                                        display: block;
                                        width: 100%;
                                        border: 3px solid #3F3F3F;
                                        border-radius: var(--stack-card-border-radius);
                                        cursor: pointer;
                                        z-index: 1;
                                    }
                                }

                                span {
                                    display: block;
                                    width: 100%;
                                    padding: .3rem 0;
                                    text-align: center;
                                    font-size: .7rem;
                                    font-weight: bold;
                                    line-height: .7rem;
                                    color: white;
                                    background-color: black;
                                    border-radius: 1rem;
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

                            span {
                                font-weight: bold;
                                text-shadow: 
                                    -1.3px -1.3px #000,
                                    -1.3px 1.3px #000,
                                    1.3px 1.3px #000;
                            }

                            .img-container {
                                img {
                                    width: 5rem;
                                    border-radius: var(--stack-card-border-radius);
                                }

                                img.shadow {
                                    position: absolute;
                                    top: 2.5rem;
                                    right: 2rem;
                                    width: 40%;
                                    aspect-ratio: 1/1;
                                    z-index: -1;
                                    filter: grayscale(1);
                                    opacity: .3;
                                }
                            }

                            .description {

                            }
                        }
                    }

                    .itemized-style {
                        display: flex;
                        flex-direction: column;
                        gap: .8rem;
                        margin: .8rem 1rem;
                        width: calc(100% - 2rem);
                        text-shadow: 
                            -1.3px -1.3px #000,
                            -1.3px 1.3px #000,
                            1.3px 1.3px #000;
                        font-weight: bold;

                        li {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            padding-left: 1rem;
                            width: 100%;
                            height: 2.5rem;
                            color: white;
                            background: linear-gradient(to bottom, #404040, #303030);
                            border-radius: 3rem;
                            line-height: 2.5rem;

                            span {
                                width: 70%;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            button {
                                position: absolute;
                                right: 0;
                                top: 0;
                                margin: .1rem;
                                padding: 2px;
                                width: 8rem;
                                height: calc(100% - .2rem);
                                color: white;
                                background: linear-gradient(#080808, #080808), 
                                            linear-gradient(#343434, #343434);
                                background-clip: content-box, border-box;
                                border-radius: 2rem;
                                border: 2px solid #080808;
                                font-weight: bold;
                                font-style: italic;
                                cursor: pointer;

                                &:hover {
                                    background: linear-gradient(#151515, #151515), 
                                                linear-gradient(#343434, #343434);
                                    background-clip: content-box, border-box;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@keyframes move-stripes {
    0% {
        transform: translateX(0) translateY(0);
    }
    100% {
        transform: translateX(-29px) translateY(50.23px);  // 25*cot(60deg) = 43.3
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
