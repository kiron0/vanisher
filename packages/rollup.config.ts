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
      tryCatchDeoptimization: false,
    },
    output: [
      {
        file: "dist/index.js",
        format: "umd",
        name: "FadeAwayModule",
        sourcemap: false,
        globals: {},
        extend: true,
        compact: true,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: false,
        compact: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: false,
        compact: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        include: /node_modules/,
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          tsBuildInfoFile: "./.tsbuildinfo",
        },
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            "console.log",
            "console.warn",
            "console.info",
            "console.error",
          ],
          passes: 3,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
          dead_code: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          if_return: true,
          inline: true,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
          beautify: false,
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
      tryCatchDeoptimization: false,
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
        compact: true,
      },
      {
        file: "dist/react.cjs",
        format: "cjs",
        sourcemap: false,
        compact: true,
      },
      {
        file: "dist/react.esm.js",
        format: "esm",
        sourcemap: false,
        compact: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        include: /node_modules/,
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          tsBuildInfoFile: "./.tsbuildinfo",
        },
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            "console.log",
            "console.warn",
            "console.info",
            "console.error",
          ],
          passes: 3,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
          dead_code: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          if_return: true,
          inline: true,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
          beautify: false,
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
      tryCatchDeoptimization: false,
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
        compact: true,
      },
      {
        file: "dist/next.cjs",
        format: "cjs",
        sourcemap: false,
        compact: true,
      },
      {
        file: "dist/next.esm.js",
        format: "esm",
        sourcemap: false,
        compact: true,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        include: /node_modules/,
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          tsBuildInfoFile: "./.tsbuildinfo",
        },
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: [
            "console.log",
            "console.warn",
            "console.info",
            "console.error",
          ],
          passes: 3,
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
          dead_code: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          if_return: true,
          inline: true,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
          beautify: false,
        },
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Type definitions
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
  {
    input: "src/react.tsx",
    output: [{ file: "dist/react.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

export default config;
