import path from "node:path";
import { defineConfig } from "vitest/config";

const root = import.meta.dirname;

// Mirrors the path aliases declared in jsconfig.json.
const alias = {
  "@/components": path.join(root, "components"),
  "@/styles": path.join(root, "styles"),
  "@/data": path.join(root, "lib/utils/data"),
  "@/utils": path.join(root, "lib/utils"),
  "@/lib": path.join(root, "lib"),
  "@/hooks": path.join(root, "hooks"),
};

export default defineConfig({
  resolve: { alias },
  test: {
    environment: "node",
    include: ["**/*.test.{js,jsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
