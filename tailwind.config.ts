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
                "gradient-border": {
                    '0%': {
                        border: '4px solid var(--flicker-color-1)'  
                    },
                    '50%': {
                        border: '4px solid var(--flicker-color-2)'  
                    },
                    '100%': {
                        border: '4px solid var(--flicker-color-1)'  
                    },
                }
            }
        },
    },
    plugins: [
        function ({
                addUtilities,
                theme
            }: { 
                addUtilities: (utilities: Record<string, Record<string, string>>) => void, 
                theme: (path: string) => Record<string, string> 
            }) {
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