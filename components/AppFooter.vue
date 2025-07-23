<script lang="ts" setup>
import { authorInfo } from '~/data/author';
</script>

<template>
    <footer class="flex flex-col items-center justify-center py-[10px] w-full h-[var(--footer-height)] bg-black text-white text-[1rem] font-bold">
        <div>
            <a href="https://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: none;">闽ICP备2024065153号</a>
        </div>
        <div>
            <span>Copyright © 2024-2025 {{ authorInfo.name }}'s Blog. All Rights Reserved.</span>
        </div>
    </footer>
</template>