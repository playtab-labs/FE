/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ── 색상 ──────────────────────────────────────────
      colors: {
        primary: '#CF5363',
        'app-bg': '#F5F5F5',
        'neutral-gray': '#BFBFBF',
        // 추후 디자이너 요구사항에 따라 추가
        // 예시:
        // secondary: '#...',
        // 'gray-custom': '#...',
      },

      // ── 폰트 패밀리 ───────────────────────────────────
      fontFamily: {
        // sans: ['Pretendard', 'System'],
        // 예시: hanseokbong: ['GapyeongHanseokbong'],
      },

      // ── 폰트 사이즈 ───────────────────────────────────
      fontSize: {
        // 예시:
        // '2xs': 10,
        // '3xl': 30,
      },

      // ── 폰트 두께 ─────────────────────────────────────
      fontWeight: {
        // 예시:
        // heavy: '900',
      },
    },
  },
  plugins: [],
};
