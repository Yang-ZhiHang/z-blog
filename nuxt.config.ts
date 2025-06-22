import { authorInfo } from "./data/author"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image'],
  css: [
    '~/styles/main.css',
    '~/styles/markdown.less',
  ],
  app: {
    head: {
      title: `${authorInfo.name}的个人博客`,
      meta: [
        { name: "description", content: `欢迎来到${authorInfo.name}的个人博客` },
        { name: "keyword", content: `${authorInfo.name}的个人博客` }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico" }
      ]
    }
  },
  routeRules: {
    '/': { redirect: '/article' }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})