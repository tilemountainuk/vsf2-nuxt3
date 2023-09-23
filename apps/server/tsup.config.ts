import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/index.ts"],
  clean: true,
  external: 'none',
  format: ["cjs"],
  ...options,
}));
