<script lang="ts" setup>
import { authorInfo } from '~/data/author';
</script>

<template>
    <footer class="footer">
        <div>
            <a href="https://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: none;">闽ICP备2024065153号</a>
        </div>
        <div>
            <span>Copyright © 2024-2025 {{ authorInfo.name }}'s Blog. All Rights Reserved.</span>
        </div>
    </footer>
</template>

<style lang="less" scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    width: 100%;
    height: var(--footer-height);
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
}
</style>
