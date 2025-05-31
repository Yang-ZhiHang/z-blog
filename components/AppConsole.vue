<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const x1 = ref(0.89)
const y1 = ref(0.005)
const x2 = ref(0.985)
const y2 = ref(0.025)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const updateCubicBezier = () => {
    document.documentElement.style.setProperty('--bezier-curve', `cubic-bezier(${x1.value}, ${y1.value}, ${x2.value}, ${y2.value})`)
    drawBezierCurve()
}

const drawBezierCurve = () => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 设置样式
    ctx.strokeStyle = '#F7DA00'
    ctx.lineWidth = 2
    ctx.font = '12px Arial'
    ctx.fillStyle = '#666'

    // 绘制坐标轴
    ctx.beginPath()
    ctx.strokeStyle = '#666'
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, canvas.height)
    ctx.stroke()

    // 绘制坐标轴标注
    // X轴标注
    ctx.fillText('0%', 5, canvas.height - 5)
    ctx.fillText('100%', canvas.width - 30, canvas.height - 5)
    
    // Y轴标注
    ctx.fillText('0s', 5, canvas.height - 5)
    ctx.fillText('0.7s', 5, 15)

    // 绘制贝塞尔曲线
    ctx.beginPath()
    ctx.strokeStyle = '#F7DA00'
    ctx.moveTo(0, canvas.height)
    
    // 计算控制点
    const p0 = { x: 0, y: canvas.height }
    const p1 = { x: x1.value * canvas.width, y: canvas.height - (y1.value * canvas.height) }
    const p2 = { x: x2.value * canvas.width, y: canvas.height - (y2.value * canvas.height) }
    const p3 = { x: canvas.width, y: 0 }

    // 绘制控制点
    ctx.fillStyle = '#666'
    ctx.beginPath()
    ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2)
    ctx.arc(p2.x, p2.y, 4, 0, Math.PI * 2)
    ctx.fill()

    // 绘制控制线
    ctx.beginPath()
    ctx.strokeStyle = '#666'
    ctx.setLineDash([5, 5])
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.moveTo(p3.x, p3.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
    ctx.setLineDash([])

    // 绘制贝塞尔曲线
    ctx.beginPath()
    ctx.strokeStyle = '#F7DA00'
    ctx.moveTo(p0.x, p0.y)
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
    ctx.stroke()

    // 绘制控制点坐标
    ctx.fillStyle = '#666'
    ctx.fillText(`(${x1.value.toFixed(2)}, ${y1.value.toFixed(2)})`, p1.x + 5, p1.y - 5)
    ctx.fillText(`(${x2.value.toFixed(2)}, ${y2.value.toFixed(2)})`, p2.x + 5, p2.y - 5)
}

watch([x1, y1, x2, y2], () => {
    updateCubicBezier()
})

onMounted(() => {
    updateCubicBezier()
})
</script>

<template>
    <div class="console">
        <div class="control-group">
            <h3>贝塞尔曲线控制</h3>
            <canvas ref="canvasRef" width="200" height="200" class="bezier-canvas"/>
            <div class="control">
                <label>X1: {{ x1.toFixed(3) }}</label>
                <input v-model="x1" type="range" min="0" max="1" step="0.001">
            </div>
            <div class="control">
                <label>Y1: {{ y1.toFixed(3) }}</label>
                <input v-model="y1" type="range" min="0" max="2" step="0.001">
            </div>
            <div class="control">
                <label>X2: {{ x2.toFixed(3) }}</label>
                <input v-model="x2" type="range" min="0" max="1" step="0.001">
            </div>
            <div class="control">
                <label>Y2: {{ y2.toFixed(3) }}</label>
                <input v-model="y2" type="range" min="0" max="2" step="0.001">
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.console {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    z-index: 1000;

    .control-group {
        h3 {
            margin: 0 0 1rem 0;
            font-size: 1rem;
        }

        .bezier-canvas {
            width: 200px;
            height: 200px;
            background: #1a1a1a;
            border-radius: 0.25rem;
            margin-bottom: 1rem;
        }

        .control {
            margin-bottom: 0.5rem;

            label {
                display: block;
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
            }

            input[type="range"] {
                width: 100%;
                margin: 0;
            }
        }
    }
}
</style>
