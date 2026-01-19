/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Blue - Extracted from About section photo (#0a2f85)
        primary: {
          50: '#eff4ff',   // Lightest tint - backgrounds, subtle highlights
          100: '#dbe6fe',  // Very light - hover states, badges
          200: '#bfd3fe',  // Light - borders, dividers
          300: '#93b4fd',  // Medium-light - secondary elements
          400: '#608bfa',  // Medium - interactive elements
          500: '#3a68f6',  // Base bright - primary CTAs, links
          600: '#0a2f85',  // EXTRACTED COLOR - main accent, focus states
          700: '#082566',  // Dark - hover states, pressed buttons
          800: '#061d4d',  // Darker - text on light backgrounds
          900: '#041533',  // Darkest - headings, strong emphasis
          950: '#020b1a',  // Ultra dark - maximum contrast
        },
        // Brand Red - Extracted from Peterson Pro Services logo diamond (#D40000)
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#D40000',  // LOGO RED - primary brand red for CTAs, accents
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          950: '#450A0A',
        },
        // Brand Gold - Extracted from Peterson Pro Services logo lion (#EBC562)
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#EBC562',  // LOGO GOLD - primary brand gold for premium elements
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        // Accent Colors - For highlights and special elements
        accent: {
          blue: '#0a2f85',      // Main extracted blue
          'blue-light': '#3a68f6',  // Lighter variant for hover
          'blue-dark': '#082566',   // Darker variant for active
          'blue-glow': 'rgba(10, 47, 133, 0.2)',  // Glow effect
          red: '#D40000',       // Logo red
          'red-light': '#EF4444',   // Lighter red for hover
          'red-dark': '#B91C1C',    // Darker red for active
          gold: '#EBC562',      // Logo gold
          'gold-light': '#FCD34D',  // Lighter gold for hover
          'gold-dark': '#D97706',   // Darker gold for active
        },
        // Glass effects with brand colors
        'glass-blue': 'rgba(10, 47, 133, 0.05)',
        'glass-blue-md': 'rgba(10, 47, 133, 0.1)',
        'glass-blue-lg': 'rgba(10, 47, 133, 0.15)',
        'glass-red': 'rgba(212, 0, 0, 0.05)',
        'glass-red-md': 'rgba(212, 0, 0, 0.1)',
        'glass-gold': 'rgba(235, 197, 98, 0.05)',
        'glass-gold-md': 'rgba(235, 197, 98, 0.1)',
      },
      fontSize: {
        // Golden Ratio Typography Scale
        'phi-xs': ['0.618rem', { lineHeight: '1.618' }],      // 9.888px
        'phi-sm': ['1rem', { lineHeight: '1.618' }],          // 16px (base)
        'phi-base': ['1.618rem', { lineHeight: '1.618' }],    // 25.888px
        'phi-lg': ['2.618rem', { lineHeight: '1.236' }],      // 41.888px
        'phi-xl': ['4.236rem', { lineHeight: '1.236' }],      // 67.776px
        'phi-2xl': ['6.854rem', { lineHeight: '1.236' }],     // 109.664px
        'phi-3xl': ['11.089rem', { lineHeight: '1.236' }],    // 177.424px

        // Fluid Typography (preserved for responsive)
        'fluid-xs': 'clamp(0.618rem, 0.6rem + 0.25vw, 0.75rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.618rem)',
        'fluid-lg': 'clamp(1.618rem, 1.4rem + 1vw, 2.618rem)',
        'fluid-xl': 'clamp(2.618rem, 2.2rem + 2vw, 4.236rem)',
        'fluid-2xl': 'clamp(4.236rem, 3.5rem + 3.5vw, 6.854rem)',
        'fluid-3xl': 'clamp(6.854rem, 5.5rem + 6.5vw, 11.089rem)',
      },
      spacing: {
        // Golden Ratio Spacing Scale (base: 8px = 0.5rem)
        'phi-xs': '0.309rem',   // 5px - φ⁻²
        'phi-sm': '0.5rem',     // 8px - base
        'phi-md': '0.809rem',   // 13px - φ
        'phi-lg': '1.309rem',   // 21px - φ²
        'phi-xl': '2.118rem',   // 34px - φ³
        'phi-2xl': '3.427rem',  // 55px - φ⁴
        'phi-3xl': '5.545rem',  // 89px - φ⁵
        'phi-4xl': '8.972rem',  // 144px - φ⁶
        'phi-5xl': '14.517rem', // 233px - φ⁷
        'phi-6xl': '23.489rem', // 376px - φ⁸

        // Fluid Spacing (preserved for responsive)
        'fluid-sm': 'clamp(0.809rem, 0.7rem + 0.5vw, 1.309rem)',
        'fluid-md': 'clamp(2.118rem, 1.8rem + 1.5vw, 3.427rem)',
        'fluid-lg': 'clamp(3.427rem, 2.8rem + 3vw, 5.545rem)',
        'fluid-xl': 'clamp(5.545rem, 4.5rem + 5vw, 8.972rem)',
      },
      screens: {
        'xs': '475px',
        'mobile-sm': { 'max': '374px' },
        'mobile-md': { 'min': '375px', 'max': '424px' },
        'mobile-lg': { 'min': '425px', 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
      },
      maxWidth: {
        // Golden Ratio Container Widths
        'phi-sm': '35rem',      // 560px
        'phi-md': '56.618rem',  // 906px (1440/φ)
        'phi-lg': '72rem',      // 1152px
        'phi-xl': '91.618rem',  // 1466px
      },
      aspectRatio: {
        'golden': '1.618',           // φ:1 (landscape)
        'golden-portrait': '0.618',  // 1:φ (portrait)
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
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
        'glass-blue': 'rgba(10, 47, 133, 0.2)',
        'glass-blue-md': 'rgba(10, 47, 133, 0.3)',
        'glass-red': 'rgba(212, 0, 0, 0.2)',
        'glass-gold': 'rgba(235, 197, 98, 0.3)',
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(10, 47, 133, 0.15)',
        'blue-glow-lg': '0 0 40px rgba(10, 47, 133, 0.2)',
        'blue-focus': '0 0 0 3px rgba(10, 47, 133, 0.1)',
        'red-glow': '0 0 20px rgba(212, 0, 0, 0.15)',
        'red-glow-lg': '0 0 40px rgba(212, 0, 0, 0.2)',
        'red-focus': '0 0 0 3px rgba(212, 0, 0, 0.1)',
        'gold-glow': '0 0 20px rgba(235, 197, 98, 0.2)',
        'gold-glow-lg': '0 0 40px rgba(235, 197, 98, 0.3)',
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6)",
      },
      ringColor: {
        'primary': '#0a2f85',
        'primary-light': '#3a68f6',
        'red': '#D40000',
        'gold': '#EBC562',
      },
    },
  },
  plugins: [],
};
