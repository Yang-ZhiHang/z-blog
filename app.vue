<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<style>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #000;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: white;
}

/* 设置滚动条宽度，箭头会自动消除 */
::-webkit-scrollbar {
  width: 5px;
  height: 0;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #2a2a2a;
  border-radius: 5px;
  width: 5px;
}

/* 使页面不被挤压（仅 Chrome 生效） */
html {
  overflow-y: overlay;
}
</style>