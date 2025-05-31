<script lang="ts" setup>

</script>

<template>
    <div class="background">
        <div class="slide-container">
            <div class="text-container">
                <div class="text-line">ZamYano's Bloo</div>
                <div class="text-line">'s Bloo ZamYano</div>
                <div class="text-line">'s Bloo ZamYano</div>
            </div>
            <div class="text-container-dst">
                <div class="text-line">ZamYano's Bloo</div>
                <div class="text-line">'s Bloo ZamYano</div>
                <div class="text-line">'s Bloo ZamYano</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.background {
    width: 100%;
    height: 100%;

    &::before {
        content: '';
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(40deg,
                #000 0,
                #000 2px,
                transparent 2px,
                transparent 4px);
        opacity: 0.1;
    }

    .slide-container {
        display: flex;
        flex-direction: row;
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translate(-25%, -50%);
        z-index: -1;
        animation: slide 100s linear infinite;


        .text-container,
        .text-container-dst {
            display: flex;
            flex-direction: column;
            width: max-content;
            height: min-content;
            font-weight: bolder;
            color: #242424;

            .text-line {
                font-size: 30vw;
                line-height: 30vw;
            }
        }
    }
}

@keyframes slide {
    0% {
        transform: translate(-25%, -50%) rotateZ(-15deg) translateX(0);
    }

    100% {
        transform: translate(-25%, -50%) rotateZ(-15deg) translateX(-50%);
    }
}

@keyframes slideTest {
    0% {
        transform: translate(-25%, -50%) scale(0.5) translateX(0);
    }

    100% {
        transform: translate(-25%, -50%) scale(0.5) translateX(-50%);
    }
}
</style>
