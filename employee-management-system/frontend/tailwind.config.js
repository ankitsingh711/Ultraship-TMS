/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'hsl(239, 84%, 67%)',
                'primary-dark': 'hsl(243, 75%, 59%)',
                'primary-light': 'hsl(235, 86%, 75%)',
                secondary: 'hsl(330, 81%, 60%)',
                'secondary-dark': 'hsl(330, 81%, 50%)',
                accent: 'hsl(271, 76%, 63%)',
                'accent-light': 'hsl(271, 76%, 73%)',
                background: 'hsl(222, 47%, 11%)',
                'background-darker': 'hsl(222, 47%, 8%)',
                surface: 'hsl(217, 33%, 17%)',
                'surface-light': 'hsl(215, 25%, 27%)',
                'surface-lighter': 'hsl(215, 20%, 35%)',
            },
            fontFamily: {
                sans: ['Inter', 'Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
