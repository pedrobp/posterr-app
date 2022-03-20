// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#66b2b2',
        primaryLight: '#b2d8d8',
        primaryDark: '#008080',
        bg: '#f8f8f8',
        bgSecondary: '#a6a6a6',
        bgDark: '#243447',
        text: '#141d26',
        textSecondary: '#9c9c9c',
        textDark: '#fff',
      },
    },
  },
  plugins: [],
}
