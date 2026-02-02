/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enforce class-based dark mode
    theme: {
        extend: {
            animation: {
                'blob': 'blob 7s infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 8s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'scroll-left': 'scroll-left 20s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg)',
                    },
                    '50%': {
                        transform: 'translateY(-20px) rotate(10deg)',
                    },
                },
                'scroll-left': {
                    '0%': {
                        transform: 'translateX(0)',
                    },
                    '100%': {
                        transform: 'translateX(-50%)',
                    },
                },
            },
        },
    },
    plugins: [],
}
