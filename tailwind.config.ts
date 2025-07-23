/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./app.vue"
    ],
    theme: {
        extend: {
            textShadow: {
                'grey': 'var(--text-shadow-grey)',
                'black': 'var(--text-shadow-black)',
                'none': 'none',
            },
            keyframes: {
                "fade-in": {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                "zzz-loading-loop": {
                    "0%": {
                        backgroundPosition: '0 6px',
                    },
                    "100%": {
                        backgroundPosition: '0 -4494px',
                    }
                }
            }
        },
    },
    plugins: [
        function ({ addUtilities, theme }: any) {
            const textShadows = theme('textShadow')
            const utilities: Record<string, { 'text-shadow': string }> = Object.entries(textShadows).reduce((acc: Record<string, { 'text-shadow': string }>, [key, value]) => {
                acc[`.text-shadow-${key}`] = {
                    'text-shadow': value as string
                }
                return acc
            }, {})
            addUtilities(utilities)
        }
    ],
}