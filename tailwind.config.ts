import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50:  '#fef3ee',
          100: '#fde3d2',
          200: '#fbc4a4',
          300: '#f89c6c',
          400: '#f46832',
          500: '#f14810',
          600: '#e22d06',
          700: '#bb1e08',
          800: '#95190f',
          900: '#781810',
          950: '#410808',
        },
      },
    },
  },
  plugins: [],
}
export default config
