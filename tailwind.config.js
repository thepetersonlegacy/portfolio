/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 2.25rem + 3.75vw, 4rem)',
        'fluid-6xl': 'clamp(3.75rem, 2.75rem + 5vw, 5rem)',
      },
      spacing: {
        'fluid-sm': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'fluid-md': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
        'fluid-lg': 'clamp(3rem, 2rem + 5vw, 5rem)',
        'fluid-xl': 'clamp(4rem, 3rem + 5vw, 6rem)',
      },
      screens: {
        'xs': '475px',
        'mobile-sm': { 'max': '374px' },
        'mobile-md': { 'min': '375px', 'max': '424px' },
        'mobile-lg': { 'min': '425px', 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '12px',
        'glass-lg': '20px',
        'glass-xl': '40px',
      },
      backgroundColor: {
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-white-md': 'rgba(255, 255, 255, 0.15)',
        'glass-white-lg': 'rgba(255, 255, 255, 0.2)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
        'glass-dark-md': 'rgba(0, 0, 0, 0.15)',
        'glass-dark-lg': 'rgba(0, 0, 0, 0.2)',
      },
      borderColor: {
        'glass-white': 'rgba(255, 255, 255, 0.2)',
        'glass-white-md': 'rgba(255, 255, 255, 0.3)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
