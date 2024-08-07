/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#ADD8E6',  // Light Blue
        'secondary': '#98FF98', // Mint Green
        'highlight': '#FFDAB9', // Peach
        'background': '#FFFDD0', // Cream
        'accent': '#E6E6FA', // Lavender
        'link': '#1E22FF'  //blue for links
      },
      fontWeight: {
        'bold-custom': '600', 
      },
      keyframes: {
        zoomIn: {
          '0%': { backgroundSize: '100%' },
          '100%': { backgroundSize: '120%' },
        },
      },
      animation: {
        'zoom-in': 'zoomIn 10s infinite alternate',
      },
    },
  },
  plugins: [],
}

