/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: 'var(--color-brand-blue)',
            dark: 'var(--color-brand-blue-dark)',
            light: 'var(--color-brand-blue-light)',
          },
          yellow: 'var(--color-brand-yellow)',
          dark: 'var(--color-brand-dark)',
          light: 'var(--color-brand-light)',
        },
      },
      backgroundColor: {
        'glass-light': 'var(--glass-bg-light)',
        'glass-dark': 'var(--glass-bg-dark)',
        'glass-white-5': 'var(--glass-bg-white-5)',
        'glass-white-10': 'var(--glass-bg-white-10)',
      },
      borderColor: {
        'glass-light': 'var(--glass-border-light)',
        'glass-dark': 'var(--glass-border-dark)',
        'glass-white-10': 'var(--glass-border-white-10)',
        'glass-white-20': 'var(--glass-border-white-20)',
      },
      boxShadow: {
        'blue': '0 0 50px -10px var(--shadow-blue)',
        'blue-light': '0 0 40px -10px var(--shadow-blue-light)',
        'blue-10': '0 0 20px -5px var(--shadow-blue-10)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};

