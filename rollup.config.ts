import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
import dts from "rollup-plugin-dts";

const config: RollupOptions[] = [
  // Main bundle (UMD for browser + CJS + ESM)
  {
    input: "src/index.ts",
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
    output: [
      {
        file: "dist/index.js",
        format: "umd",
        name: "FadeAwayModule",
        sourcemap: false,
        globals: {},
        extend: true,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.warn", "console.info"],
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
      }),
    ],
    external: [],
  },
  // React component bundle
  {
    input: "src/react.tsx",
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
    output: [
      {
        file: "dist/react.js",
        format: "umd",
        name: "FadeAwayReact",
        sourcemap: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        extend: true,
      },
      {
        file: "dist/react.cjs",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/react.esm.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.warn", "console.info"],
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Next.js React component bundle
  {
    input: "src/next.tsx",
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
    output: [
      {
        file: "dist/next.js",
        format: "umd",
        name: "FadeAwayReactNextJS",
        sourcemap: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        extend: true,
      },
      {
        file: "dist/next.cjs",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/next.esm.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.warn", "console.info"],
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Type definitions
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
  {
    input: "dist/react.d.ts",
    output: [{ file: "dist/react.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

export default config;
