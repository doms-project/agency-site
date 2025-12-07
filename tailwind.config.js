/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './styles/**/*.{js,jsx,ts,tsx}',
    './sections/**/*.{js,jsx,ts,tsx}',
  ],
  // Safelist classes that are used in String.raw templates (sections)
  // Tailwind JIT may not detect these classes properly
  safelist: [
    'lg:grid-cols-4',
    'lg:grid-cols-3',
    'md:grid-cols-2',
    'lg:gap-12',
    'lg:gap-6',
    'lg:justify-items-stretch',
    'lg:px-8',
    'xl:px-12',
    '2xl:px-16',
    'lg:hidden',
    'md:hidden',
    'hidden',
    'md:grid',
    'md:flex',
    'lg:block',
    'md:block',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

