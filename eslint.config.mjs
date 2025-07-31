import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Build outputs
      ".next/**/*",
      "out/**/*",
      "dist/**/*",
      "build/**/*",
      
      // Generated files
      "src/generated/**/*",
      "prisma/generated/**/*",
      "**/prisma/runtime/**/*",
      "**/generated/prisma/**/*",
      
      // Dependencies
      "node_modules/**/*",
      
      // Environment files
      ".env*",
    ],
  },
];

export default eslintConfig;