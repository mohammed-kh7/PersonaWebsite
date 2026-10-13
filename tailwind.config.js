/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Royal Blue as primary
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Solid Royal Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Deep Navy palette
        navy: {
          50: '#f0f4ff',
          100: '#dde6ff',
          200: '#c0d0ff',
          300: '#8fadfc',
          400: '#5a8af7',
          500: '#3366e6',
          600: '#2550c4',
          700: '#1c3da1',
          800: '#142c75',
          900: '#0d1d4d',
          950: '#08112c',
        },
        // Charcoal Black & Slate Surfaces
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          850: '#0f172a',
          900: '#090e1a',
          950: '#020617', // Very dark navy / charcoal black
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.85)',
          dark: 'rgba(9, 14, 26, 0.8)',
          border: {
            light: 'rgba(226, 232, 240, 0.8)',
            dark: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        arabic: ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'skill-fill': 'skillFill 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        skillFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--skill-level)' },
        },
      },
      boxShadow: {
        'royal': '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
        'royal-lg': '0 20px 35px -8px rgba(37, 99, 235, 0.3)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'card-light': '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
