import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#FFFFFF',
          surface: '#F8F9FB',
          elevated: '#FFFFFF',
          hover: 'rgba(0, 0, 0, 0.03)',
        },
        green: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#1DB954',
          600: '#158A3E',
        },
        gold: {
          50: '#FFFBEB',
          500: '#C9A84C',
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
        border: {
          subtle: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.05)',
        lg: '0 10px 25px rgba(0,0,0,0.08)',
        green: '0 4px 14px rgba(29,185,84,0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F0FFF4 0%, #FFFFFF 50%, #F0F7FF 100%)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
export default config;
