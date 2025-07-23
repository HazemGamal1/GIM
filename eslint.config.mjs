import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore all files in src/generated/prisma
  {
    ignores: ["src/generated/prisma/**"],
  },

  // Your base config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
