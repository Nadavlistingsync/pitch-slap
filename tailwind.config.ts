import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4154',
        accent: '#2e2e2e',
        pitchslap: {
          bg: '#0a0a0a',
          card: 'rgba(24, 24, 27, 0.85)',
          glass: 'rgba(255,255,255,0.08)',
          accent: '#ff4154',
          accent2: '#a78bfa',
          accent3: '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0,0,0,0.2)',
        'glow-pink': '0 0 40px 0 #ff4154, 0 0 80px 0 #a78bfa',
        'glass': '0 4px 32px 0 rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'ego-gradient': 'radial-gradient(ellipse at top, #ff4154 0%, #a78bfa 50%, #0a0a0a 100%)',
        'ego-glow': 'linear-gradient(90deg, #ff4154 0%, #a78bfa 50%, #60a5fa 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config; 