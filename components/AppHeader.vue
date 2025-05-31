<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { navList } from '~/constants/nav'
const route = useRoute()
</script>

<template>
    <div class="header">
        <AppAuthor :avatar-url="'https://zamyang.cn/api/image/hKBtsmYPiXzq9x2vmKCNCp.webp'" />
        <ul>
            <li v-for="(nav, idx) in navList" :key="idx">
                <a :href="nav.href" :class="{ active: route.path.startsWith(nav.href) }">
                    {{ nav.title }}
                    <div class="bg" />
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.header {
    display: flex;
    position: fixed;
    justify-content: space-between;
    top: 0;
    width: 100%;
    background: #000;
    z-index: 100;

    ul {
        display: flex;
        justify-content: space-around;
        padding: 0;
        margin-right: 1rem;
        height: 2rem;
        background-color: #050505;
        border-radius: 2rem;
        border: 2px solid #383838;

        li {
            padding: 0.3rem 0;
            color: white;
            font-weight: bold;
            font-style: italic;
            cursor: pointer;

            a {
                position: relative;
                padding: 0.3rem 3rem;

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
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: .5rem .8rem;
                transform: skewX(var(--inclination-degree));

                /* 保证相对背景在文字背后 */
                z-index: -1;
            }

            &:has(a.active) .bg {
                animation: gradientColor 1.48s linear infinite, scaleBg .68s linear infinite;
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

@keyframes scaleBg {

    0%,
    50%,
    100% {
        transform: skewX(var(--inclination-degree)) scaleX(1.05) scaleY(1.05);
    }

    40% {
        transform: skewX(var(--inclination-degree)) scaleX(1.1) scaleY(1.25);
    }
}

@keyframes gradientColor {
    0% {
        background-color: #F1D801;
    }

    50% {
        background-color: #6bbd00;
    }

    100% {
        background-color: #F1D801;
    }
}
</style>
