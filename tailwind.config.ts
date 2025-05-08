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
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};

export default config; 