/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        // Heading
        h1: ["24px", { lineHeight: "33.6px" }],
        // Title
        t1: ["20px", { lineHeight: "28px" }],
        t2: ["18px", { lineHeight: "25.2px" }],
        t3: ["16px", { lineHeight: "22.4px" }],
        // Body
        b1: ["18px", { lineHeight: "25.2px" }],
        b2: ["16px", { lineHeight: "22.4px" }],
        b3: ["14px", { lineHeight: "19.6px" }],
        b4: ["12px", { lineHeight: "16.8px" }],
        b5: ["10px", { lineHeight: "14px" }],
      },
      fontWeight: {
        // Eb = ExtraBold (800), Sb = SemiBold (600), Rg = Regular (400)
        // 기본 Tailwind에 이미 포함되어 있으나 명시적으로 선언
        eb: "800",
        sb: "600",
        rg: "400",
      },
    },
  },
  plugins: [],
};
