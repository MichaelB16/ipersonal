/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f0a38',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeOut: 'fadeOut 10s ease-out',
      },
      screens: {
        xs: '0px',
        sm: '576px',
        md: '1024px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions',
      ],
    }),
    require('tailwindcss'),
  ],
};
