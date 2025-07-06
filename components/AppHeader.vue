<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { navList } from '~/constants/nav'
const route = useRoute()

const mobileMenuVisible = ref(false)
const toggleMobileMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value
}
</script>

<template>
    <header class="flex fixed items-center justify-between top-0 w-full h-[var(--header-height)] bg-black z-50">
        <AppAuthor />
        <ul class="nav-pc relative flex shrink-0 justify-around items-center p-0 mr-4 h-[2.2rem] bg-[#050505] rounded-[2rem] border-[3px] border-[#383838] shadow-[0_0_0_1px_rgba(255,255,255,.1),inset_0_0_4px_rgba(0,0,0,1)]">
            <li 
                v-for="(nav, idx) in navList" 
                :key="idx"
                class="w-[9rem] text-white text-center font-bold italic cursor-pointer align-middle"
            >
                <NuxtLink 
                    :to="nav.href" 
                    :class="{ active: route.path.startsWith(nav.href) }"
                    class="relative z-0 hover:text-[#808080]"
                >
                    {{ nav.title }}
                    <div class="bg absolute top-1/2 left-1/2 w-[9.5rem] h-[2.5rem] rounded-[.5rem_1rem] -translate-x-1/2 -translate-y-1/2 skew-x-[var(--inclination-degree)] z-[-1]" />
                </NuxtLink>
            </li>
        </ul>
        <div class="mobile-menu-wrapper relative h-full aspect-square">
            <button class="mobile-menu" @click="toggleMobileMenu">
                <span v-for="_ in 3" class="absolute block  top-1/2 left-0 bg-[#232323] w-[70%] h-[6px] rounded-full"></span>
            </button>
        </div>
        <Transition name="fade-in">
            <ul class="nav-mobile absolute top-[var(--header-height)] right-0 p-4 mr-[2rem]" v-if="mobileMenuVisible">
                <li 
                v-for="(nav, idx) in navList" 
                :key="idx"
                class="relative flex justify-center items-center p-0 w-36 h-10 text-white text-center font-bold italic bg-[#050505] rounded-[2rem] border-[3px] border-[#383838] shadow-[0_0_0_1px_rgba(255,255,255,.1),inset_0_0_4px_rgba(0,0,0,1)] align-middle"
                >
                    <NuxtLink 
                        :to="nav.href" 
                        :class="{ active: route.path.startsWith(nav.href) }" 
                        class="relative z-0 hover:text-[#808080]"
                        @click="mobileMenuVisible = false"
                    >
                        {{ nav.title }}
                        <div class="bg absolute top-1/2 left-1/2 w-[9.5rem] h-[2.5rem] rounded-[.5rem_1rem] -translate-x-1/2 -translate-y-1/2 skew-x-[var(--inclination-degree)] z-[-1]" />
                    </NuxtLink>
                </li>
            </ul>
        </Transition>
    </header>
</template>

<style lang="less" scoped>
.nav-pc {
    // 背景网格：每个 repeat 单位左上右下各一圆点
    background-image:
        radial-gradient(#1a1a1a 1.2px, transparent 1.2px),
        radial-gradient(#1a1a1a 1.2px, transparent 1.2px);
    background-size: 5px 5px;
    background-position: 0 0, 2.5px 2.5px;

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
        a.active {
            color: black;
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

.nav-mobile {
    @media (min-width: 650px) {
        display: none;
        
    }
    li {
        background-image:
            radial-gradient(#1a1a1a 1.2px, transparent 1.2px),
            radial-gradient(#1a1a1a 1.2px, transparent 1.2px);
        background-size: 5px 5px;
        background-position: 0 0, 2.5px 2.5px;

        &:first-child {
            margin-bottom: 1rem;
        }

        // 顶部光泽
        &::before {
            content: '';
            position: absolute;
            top: -3px;
            left: 12px;
            right: -3px;
            height: 1px;
            width: 80%;
            background: linear-gradient(90deg,
                    transparent,
                    rgba(255, 255, 255, 0.2) 10%,
                    rgba(255, 255, 255, 0.2) 70%,
                    transparent);
            border-radius: 2rem;
        }
            
        a.active {
            color: black;
        }

        &:has(a.active) .bg {
            animation: gradient-color 1.48s linear infinite, scale-bg .68s linear infinite;
        }
    }
}

.mobile-menu-wrapper {

    @media (min-width: 650px) {
        display: none;
    }

    .mobile-menu {
        position: relative;
        width: 100%;
        height: 100%;

        span {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: -3px;
                height: 2px;
                background: linear-gradient(90deg,
                    transparent,
                    rgba(255, 255, 255, 0.2) 5%,
                    rgba(255, 255, 255, 0.2) 70%,
                    transparent);
            }

            &:first-child {
                transform: translateY(-200%);
            }
            &:last-child {
                transform: translateY(200%);
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

.fade-in-enter-active,
.fade-in-leave-active {
    transition: all .2s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
    transform: translateY(-20%);
}
</style>
