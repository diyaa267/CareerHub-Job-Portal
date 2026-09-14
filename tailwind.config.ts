import type {Config} from 'tailwindcss';
export default {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{fontFamily:{sans:['Inter','ui-sans-serif','system-ui']},boxShadow:{glow:'0 0 50px rgba(34,197,94,.12)'}}},plugins:[]} satisfies Config;
