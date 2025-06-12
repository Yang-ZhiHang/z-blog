<script lang="ts" setup>
const route = useRoute();
</script>

<template>
    <div class="article-container">
        {{ route.params.id }}
    </div>
</template>

<style lang="less" scoped></style>
