<template>
    <div>
        <AppBackground />
        <AppHeader />
        <div class="content">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>

<style lang="less" scoped>
.content {
    position: relative;
    margin-top: var(--header-height);
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
}
</style>