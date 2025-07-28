<template>
    <div>
        <AppBackground />
        <AppHeader />
        <div class="relative mt-[var(--height-header)] w-full min-h-[100vh] overflow-hidden">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>