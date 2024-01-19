import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Configuration} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'sm': '520px',      
            'md': '768px',
            'lg': '992px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                sm: '2rem',
                md: "2.5rem",
                lg: '3.5rem',
                xl: '4rem',
            },
        },
        extend: {
            colors: {
                // mainBg: "#15202B",
                mainBg: "#0d1117",
                mainColor: "#dadcdf",
                secBg: "#f9f9f9",
                secColor: "#191716",
            },
        },
    },
    plugins: [
        typography(),
    ],
};
