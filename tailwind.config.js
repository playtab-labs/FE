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
      colors: {
        // ── Grayscale ────────────────────────────
        "extra-white": "#FFFFFF",
        "soft-gray-white": "##F5F5F5",
        "soft-gray": "##E4E4E4",
        gray: "##BFBFBF",
        "dark-gray": "#555555",
        "gray-black": "#1A1A1A",

        // // ── Sogang ───────────────────────────────
        // sogang: {
        //   brown:  "#7B1818",
        //   black:  "#000000",
        //   pink:   "#E5196E",
        //   yellow: "#FFE500",
        //   sky:    "#6CC5C5",
        // },
        primary: {
          "hot-pink": "#FF0F47",
          bk: "#070000",
        },
        secondary: {
          salmon: "#FFAD96",
          "baby-pink": "#F7C1C4",
          "bubblegum-pink": "#F38B98",
        },
      },
    },
  },
  plugins: [],
};
