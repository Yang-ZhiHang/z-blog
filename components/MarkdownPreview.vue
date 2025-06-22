<script>
export default {
    name: "MarkdownArea",
    props: {
        markdown: {
            type: String,
            required: true,
        },
    },
    computed: {
        markdownContent() {
            var formula = this.markdown
                .replace(/\$\$(.+?)\$\$/gs, (_, equation) => {
                    return (
                        "<katex-formula-ml>" +
                        katex.renderToString(equation, {
                            throwOnError: false,
                        }) +
                        "</katex-formula-ml>"
                    );
                })
                .replace(/\$(.+?)\$/g, (_, equation) => {
                    return (
                        "<katex-formula>" +
                        katex.renderToString(equation, {
                            throwOnError: false,
                        }) +
                        "</katex-formula>"
                    );
                });
            return marked(formula);
        },
    },
};
</script>

<script setup>
import { marked } from "marked";

import katex from "katex";
import "katex/dist/katex.min.css";

import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.min.css'

var renderer = new marked.Renderer();

renderer.code = (code) => {
    return `<pre><code class="hljs ${code.lang ?? "text"}">${
        hljs.highlight(code.text, { language: code.lang ?? "text" }).value
    }</code></pre>`;
};

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
});
</script>

<template>
    <div class="markdown-body" v-html="markdownContent" />
</template>

<style scoped></style>
