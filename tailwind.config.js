/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{html,vue,js}'],
    theme: {
        extend: {}
    },
    plugins: [require('@savvywombat/tailwindcss-grid-areas'), require('@tailwindcss/line-clamp')]
}
