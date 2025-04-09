import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["node_modules", "dist"],
    eslintPluginPrettierRecommended,
  },
]);
