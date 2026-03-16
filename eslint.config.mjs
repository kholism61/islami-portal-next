import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/css/**",
    "public/js/**",
    "tool/**",
    "tools/**",
    "smart-fiqh/**",
    "sw.js",
    "public/legacy/**",
  ]),

  {
    files: [
      "src/components/core/LegacyHomeStyle.tsx",
    ],
    rules: {
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-css-tags": "off",
    },
  },
  {
    files: [
      "src/components/core/HomeClient.tsx",
      "src/components/DonationActions.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
