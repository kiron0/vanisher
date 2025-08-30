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
          verbatimModuleSyntax: false,
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
          passes: 2,
          unsafe: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          dead_code: true,
          evaluate: true,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: true,
          inline: false,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: false,
          reduce_funcs: false,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: false,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: false,
          properties: false,
          reserved: [
            "React",
            "react",
            "useState",
            "useEffect",
            "useRef",
            "useMemo",
            "memo",
          ],
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
        format: "cjs",
        sourcemap: false,
        compact: true,
        exports: "named",
      },
      {
        file: "dist/react.cjs",
        format: "cjs",
        sourcemap: false,
        compact: true,
        exports: "named",
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
          verbatimModuleSyntax: false,
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
          passes: 2,
          unsafe: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          dead_code: true,
          evaluate: true,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: true,
          inline: false,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: false,
          reduce_funcs: false,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: false,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: false,
          properties: false,
          reserved: [
            "React",
            "react",
            "useState",
            "useEffect",
            "useRef",
            "useMemo",
            "memo",
          ],
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
        format: "cjs",
        sourcemap: false,
        compact: true,
        exports: "named",
      },
      {
        file: "dist/next.cjs",
        format: "cjs",
        sourcemap: false,
        compact: true,
        exports: "named",
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
          verbatimModuleSyntax: false,
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
          passes: 2,
          unsafe: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          dead_code: true,
          evaluate: true,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: true,
          inline: false,
          join_vars: true,
          loops: true,
          negate_iife: true,
          properties: false,
          reduce_funcs: false,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: false,
          typeofs: true,
          unused: true,
        },
        mangle: {
          toplevel: false,
          properties: false,
          reserved: [
            "React",
            "react",
            "useState",
            "useEffect",
            "useRef",
            "useMemo",
            "memo",
          ],
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
  {
    input: "src/next.tsx",
    output: [{ file: "dist/next.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

export default config;
