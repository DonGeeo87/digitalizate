/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/**/*.css'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
          bg: '#1c1917',
        },
        surface: {
          DEFAULT: '#111827',
          light: '#1f2937',
          lighter: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'streak-flicker': 'flicker 0.8s ease-in-out infinite alternate',
        'badge-bounce': 'badgeBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'count-up': 'countFade 0.6s ease-out',
        'timer-pulse': 'timerPulse 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(245,158,11,0.15)' }, '50%': { boxShadow: '0 0 40px rgba(245,158,11,0.3)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        flicker: { '0%': { transform: 'scale(1) rotate(-2deg)' }, '100%': { transform: 'scale(1.15) rotate(2deg)' } },
        badgeBounce: { '0%': { transform: 'scale(0.5)' }, '100%': { transform: 'scale(1)' } },
        countFade: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        timerPulse: { '0%,100%': { boxShadow: '0 0 0 0 rgba(245,158,11,0.4)' }, '50%': { boxShadow: '0 0 20px 4px rgba(245,158,11,0.15)' } },
      },
    },
  },
  plugins: [],
}
