<template>
    <div>
        <AppBackground />
        <AppHeader />
        <div class="relative mt-[var(--header-height)] w-full min-h-[100vh] overflow-hidden">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>