<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { navList } from '~/constants/nav'
const route = useRoute()
</script>

<template>
    <header class="header">
        <AppAuthor />
        <ul>
            <li v-for="(nav, idx) in navList" :key="idx">
                <NuxtLink :to="nav.href" :class="{ active: route.path.startsWith(nav.href) }">
                    {{ nav.title }}
                    <div class="bg" />
                </NuxtLink>
            </li>
        </ul>
    </header>
</template>

<style lang="less" scoped>
.header {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    top: 0;
    width: 100%;
    height: var(--header-height);
    background: #000;
    z-index: 100;

    ul {
        position: relative;
        display: flex;
        flex-shrink: 0;
        justify-content: space-around;
        align-items: center;
        padding: 0;
        margin-right: 1rem;
        height: 2.2rem;
        background-color: #050505;

        // 背景网格：每个 repeat 单位左上右下各一圆点
        background-image:
            radial-gradient(#1a1a1a 1.2px, transparent 1.2px),
            radial-gradient(#1a1a1a 1.2px, transparent 1.2px);
        background-size: 5px 5px;
        background-position: 0 0, 2.5px 2.5px;
        border-radius: 2rem;
        border: 3px solid #383838;
        box-shadow:
            0 0 0 1px rgba(255, 255, 255, .1),
            inset 0 0 4px rgba(0, 0, 0, 1);

        @media (max-width: 650px) {
            display: none;
        }
        
        // 顶部光泽
        &::before {
            content: '';
            position: absolute;
            top: -3px;
            left: 12px;
            right: -3px;
            height: 1px;
            background: linear-gradient(90deg,
                    transparent,
                    rgba(255, 255, 255, 0.2) 2%,
                    rgba(255, 255, 255, 0.2) 70%,
                    transparent);
            border-radius: 2rem;
        }

        li {
            width: 9rem;
            color: white;
            text-align: center;
            font-weight: bold;
            font-style: italic;
            cursor: pointer;
            vertical-align: middle;

            a {
                position: relative;

                /* 保证 a 标签的相对位置 */
                z-index: 0;

                &:hover {
                    color: #808080;
                }

                &.active {
                    color: black;
                }
            }

            .bg {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 9.5rem;
                height: 2.5rem;
                border-radius: .5rem 1rem;
                transform: translate(-50%, -50%) skewX(var(--inclination-degree));

                /* 保证相对背景在文字背后 */
                z-index: -1;
            }

            &:has(a.active) .bg {
                animation: gradient-color 1.48s linear infinite, scale-bg .68s linear infinite;
            }

            &:first-child .bg {
                border-radius: 2rem 3rem 2rem 7rem;
            }

            &:last-child .bg {
                border-radius: 2rem 7rem 2rem 3rem;
            }
        }
    }
}

@keyframes scale-bg {

    0%,
    50%,
    100% {
        transform: translate(-50%, -50%) skewX(var(--inclination-degree)) scaleX(1.05) scaleY(1.05);
    }

    35% {
        transform: translate(-50%, -50%) skewX(var(--inclination-degree)) scaleX(1.1) scaleY(1.25);
    }

    40% {
        transform: translate(-50%, -50%) skewX(var(--inclination-degree)) scaleX(1.12) scaleY(1.3);
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
