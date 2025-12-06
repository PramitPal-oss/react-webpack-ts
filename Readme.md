# Table of contents

1. Quick glossary (core concepts you'll see repeatedly)
2. Packages — grouped and explained (why you need them & what they do)
3. `.babelrc` — every line explained + examples
4. `webpack.common.js` — every field & rule explained + examples
5. `webpack.dev.js` — every field explained + why it’s dev-specific
6. `webpack.prod.js` — every field & rule explained + production optimizations (tree-shaking, minimizers, image optimization, splits)
7. `postcss.config.js` (autoprefixer) — why & example
8. `global.d.ts` — why we need it and what each declaration does
9. Quick checklist / next steps you might want

---

# 1 — Quick glossary (short, so later terms make sense)

- **Bundler (Webpack)**: takes many JS/CSS/images and produces optimized files for the browser.
- **Transpiler (Babel / TypeScript)**: converts modern JS/TS/JSX into browser-compatible JS.
- **Loader**: Webpack plugin that transforms files during bundling (e.g., `babel-loader`, `css-loader`).
- **Plugin**: Webpack extension that hooks into the build pipeline for tasks (e.g., extract CSS, clean output).
- **Tree shaking**: removing unused exports from bundles at build time (reduces code size). Works when modules use ES module syntax (`import` / `export`).
  - Example: if a library exports `a`, `b`, `c` but you only import `a`, a bundler + minifier can omit `b` & `c` from final bundle.

- **Code splitting**: splitting the bundle into chunks loaded on demand (reduces initial load).
- **Runtime helpers**: small utility functions Babel uses (e.g., `_extends`, `_slicedToArray`). `@babel/plugin-transform-runtime` avoids duplicating those helpers by importing them from `@babel/runtime` so they stay single-copy.
- **Source maps**: map resulting bundle back to original source for debugging.
- **Asset modules**: Webpack 5 built-in way to handle images/fonts (replaces file-loader/url-loader).

---

# 2 — Packages: what they are and why you have them

I’ll group them by purpose.

### Core app runtime

- **react / react-dom** — the UI library and DOM renderer. Required for any React app.

### Babel (transpiling modern JS/JSX/TS)

- **@babel/core** — Babel engine (core transformer).
- **@babel/preset-env** — transforms ESNext → target-compatible JS. Decides which transforms based on browser targets.
  - Why? You can write modern JS (ES2022 etc.) and it will be converted to code that older browsers understand.
  - Option used: `{ "modules": false }` — this leaves `import`/`export` alone so Webpack can perform tree-shaking and module optimizations.

- **@babel/preset-react** — adds JSX + React transforms. `{ "runtime": "automatic" }` enables the **new JSX transform** (no need to import `React` in every file).
  - Example: `jsx runtime automatic` lets Babel compile JSX into `jsx` calls that use `react/jsx-runtime` instead of `React.createElement`.

- **@babel/preset-typescript** — lets Babel parse TypeScript and strip types. (Note: you still use `ts-loader` for type-checking or use Babel + `fork-ts-checker-webpack-plugin` alternate approach.)
- **@babel/plugin-transform-runtime** — replaces inline helper code with imports from `@babel/runtime`. Prevents repeated helper code across compiled files, keeps bundle smaller.
- **@babel/runtime** (dependency, not dev) — the runtime package that the transform-runtime plugin imports helpers from. Must be installed as a regular dependency because helpers are imported at runtime.

### TypeScript & loaders

- **typescript** — the TypeScript compiler (for type checking).
- **ts-loader** — Webpack loader that uses `tsc` (TypeScript) to transpile TS/TSX. You included it to compile `.ts/.tsx` files. (Note: you also included Babel TS preset; either approach works. In your setup `ts-loader` actually compiles TS and Babel handles JS/JSX.)
- **@types/react / @types/react-dom** — TypeScript type definitions for React & React DOM. Needed for TS projects.

### Webpack core & CLI

- **webpack** — bundler core.
- **webpack-cli** — command-line interface for webpack commands.
- **webpack-dev-server** — development server with HMR (hot module replacement).

### Loaders & CSS handling

- **babel-loader** — connects Babel with Webpack (transpiles JS through Babel).
- **css-loader** — resolves `@import` and `url()` in CSS and optionally enables CSS Modules.
- **style-loader** — injects CSS into DOM via `<style>` tags (used in dev).
- **mini-css-extract-plugin** — extracts CSS into separate `.css` files (used in production for caching & better performance).
- **sass** — Sass compiler (Dart Sass).
- **sass-loader** — compiles SCSS/SASS into CSS to feed into `css-loader`.
- **postcss-loader** (used implicitly in prod rules with `postcss-loader`) and **autoprefixer** (in `postcss.config.js`) — automatically add vendor prefixes (like `-webkit-`) for CSS compatibility.

### Optimization & minimizers

- **terser-webpack-plugin** — JS minifier (minimizes JS and supports modern options). Used in production to shrink JS.
- **css-minimizer-webpack-plugin** — CSS minifier.
- **image-minimizer-webpack-plugin** — plugin that uses `imagemin` to compress images at build time.
- **imagemin / imagemin-mozjpeg / imagemin-pngquant / imagemin-svgo** — image optimization libraries/plugins for JPEG, PNG, SVG.

### Dev tooling & linting

- **eslint** — linter for JS/TS.
- **@typescript-eslint/parser & @typescript-eslint/eslint-plugin** — parse TypeScript in ESLint and provide TypeScript-specific rules.
- **eslint-plugin-react / eslint-plugin-react-hooks** — React-specific lint rules and hooks rules.
- **eslint-plugin-prettier & eslint-config-prettier** — integrate Prettier into ESLint (`prettier` enforces formatting rules and `eslint-config-prettier` turns off ESLint rules that conflict with Prettier).

### Misc utilities / build helpers

- **clean-webpack-plugin** — removes `dist/` before each build. Keeps output clean.
- **html-webpack-plugin** — generates `index.html` and injects bundles automatically (script and link tags).
- **dotenv-webpack** — injects `.env` variables into `process.env.*` at build time.
- **image loaders using asset modules** — (no specific package, using webpack `asset/resource`).

---

# 3 — `.babelrc` explained line-by-line

```json
{
  "presets": [
    ["@babel/preset-env", { "modules": false }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

- **`presets`** — groups of Babel plugins that transform specific language features.

1. `["@babel/preset-env", { "modules": false }]`
   - `preset-env` decides which JS transforms to apply (like converting arrow functions, classes, `const`/`let`, etc.) based on a target environment.
   - `modules: false` tells Babel **not** to convert ES modules (`import`/`export`) into CommonJS.
     - **Why?** If Babel converted your modules to CommonJS before Webpack sees them, Webpack's tree shaking and module optimization would be degraded. By leaving ES modules intact, Webpack performs tree shaking and better bundle optimization.

   - **Example**: if you write `export function foo() {}`, a build with `modules:false` keeps it as an ES export for Webpack to analyze.

2. `["@babel/preset-react", { "runtime": "automatic" }]`
   - Handles JSX transformation.
   - `runtime: "automatic"` enables the **new JSX transform** (React 17+). You no longer need `import React from 'react'` at the top of every JSX file.
   - Instead, compiled JSX uses functions from `react/jsx-runtime`.
   - **Example**:
     - `const x = <div />` compiles to `jsx("div", {...})` instead of `React.createElement("div", ...)`.

3. `"@babel/preset-typescript"`
   - Allows Babel to parse TypeScript syntax and strip types (it **does not** do type checking; `tsc` does that).
   - Useful if you want Babel to remove types and do transformations in one pass. You still commonly use `ts-loader` or `fork-ts-checker-webpack-plugin` to type-check separately.

- **`plugins: ["@babel/plugin-transform-runtime"]`**
  - This plugin avoids duplicating helper functions (like `_extends`, `_slicedToArray`) in every compiled file by importing them from `@babel/runtime`.
  - Important: you **must** install `@babel/runtime` (as a normal dependency) for this to work — we already added it.
  - **Why useful?** smaller bundle, no helper duplication, avoids polluting global scope (no polyfills added globally).
  - **Example**: instead of injecting `function _extends(){...}` into every file, Babel will insert `import _extends from "@babel/runtime/helpers/extends";`.

---

# 4 — `webpack.common.js` explained fully

```js
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.jsx',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

- **Top imports**: `path` and `fileURLToPath` used because your config is an ES module (`type: "module"` in package.json). `__dirname` is derived to get absolute paths in ESM.

- **`entry: './src/index.jsx'`**
  - The application entry point (where Webpack starts building the dependency graph).
  - If you migrate to TypeScript, change to `./src/index.tsx` eventually.

- **`resolve.extensions`**
  - Array of file extensions Webpack will automatically resolve. So `import App from './App'` can match `App.tsx`, `App.ts`, `App.js`, `App.jsx`.
  - Order matters — it searches in that order.

- **`module.rules`** — tell Webpack how to handle different file types:
  1. **Babel rule**

     ```js
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: 'babel-loader',
     }
     ```

     - `test` is a regex for file extensions.
     - `exclude` avoids transpiling dependencies (faster).
     - `babel-loader` runs Babel for JS/JSX files (applies `.babelrc` rules).

  2. **Asset/resource for images**

     ```js
     {
       test: /\.(png|jpg|jpeg|gif|svg)$/i,
       type: 'asset/resource',
     }
     ```

     - **Webpack 5 asset modules**: `asset/resource` emits a separate file and returns the URL. Equivalent to old `file-loader`.
     - Output filename determined by `assetModuleFilename` in `output` (configured in prod).
     - **Example**: `import logo from './logo.png'` → `logo` becomes `/assets/abcd1234.png`.

  3. **Fonts**

     ```js
     {
       test: /\.(woff|woff2|ttf|eot)$/i,
       type: 'asset/resource',
     }
     ```

     - Same as asset/resource but for font files.

  4. **TypeScript loader**

     ```js
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/,
     }
     ```

     - `ts-loader` compiles `.ts`/`.tsx` files using TypeScript.
     - Note: you have both Babel and ts-loader — both are valid workflows:
       - Current setup: Babel handles JS files; ts-loader handles TS files (ts-loader uses `tsconfig.json` for options).
       - Alternative: use `babel-loader` for TS as well (with `@babel/preset-typescript`) and `fork-ts-checker-webpack-plugin` for type checking.

- **`plugins`**
  - `new CleanWebpackPlugin()` — removes old builds in `dist/` before each build.
  - `new HtmlWebpackPlugin({ template: './src/index.html' })` — generates `index.html` and injects scripts automatically. Also copies your template.

---

# 5 — `webpack.dev.js` (development configuration)

```js
import Dotenv from 'dotenv-webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    static: './public',
  },

  module: {
    rules: [
      // CSS MODULES
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]___[hash:base64:5]' }, esModule: false },
          },
        ],
      },

      // GLOBAL CSS
      { test: /\.css$/i, exclude: /\.module\.css$/i, use: ['style-loader', 'css-loader'] },

      // SCSS MODULES
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]___[hash:base64:5]' }, esModule: false },
          },
          'sass-loader',
        ],
      },

      // GLOBAL SCSS
      { test: /\.s[ac]ss$/, exclude: /\.module\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  plugins: [new Dotenv()],
});
```

- **`merge(common, {...})`** — merges common config with dev-specific overrides (keeps things DRY).

- **`mode: 'development'`**
  - Enables non-minified output, better debugging, and Webpack defaults that are dev-friendly.

- **`output.filename: 'bundle.js'`**
  - In dev you often output to a constant filename for simplicity and dev-server caching.

- **`publicPath: '/'`**
  - Base path for assets. Important for SPA routing (works with `historyApiFallback`).

- **`devtool: 'eval-cheap-module-source-map'`**
  - Source map choice optimized for speed in development; provides line-level mapping while keeping rebuilds fast.
  - **Example**: If an error is thrown, you can see the original source file line in the browser devtools.

- **`devServer` options**
  - `hot: true` — enable Hot Module Replacement (HMR) so changes can be injected without full page reload. Great for faster development feedback.
  - `port: 3000` — dev server port.
  - `open: true` — automatically open browser.
  - `historyApiFallback: true` — important for single page apps using client-side routing: any unknown path serves `index.html`.
  - `static: './public'` — serves static files from `public` folder (e.g., `public/favicon.ico`).

- **CSS rules in dev**
  - Use `style-loader` (inject CSS in `<style>` tags). This gives instant CSS updates and is simpler than extracting to files.
  - CSS Modules rules: `test: /\.module\.css$/i` plus `css-loader` option `modules` with `localIdentName`.
    - `localIdentName: '[name]__[local]___[hash:base64:5]'` — friendly, readable classNames in dev for debugging (e.g., `Button__root___a1b2c`).
    - `esModule: false` — sometimes needed to keep compatibility with how CSS modules are imported in TS/JS code.

  - SCSS rules: `sass-loader` compiles SCSS → CSS before `css-loader`.

- **`plugins: [new Dotenv()]`**
  - `dotenv-webpack` reads `.env` and injects variables at build time as `process.env.*`. Good for local dev secrets (but keep `.env` out of git).

---

# 6 — `webpack.prod.js` (production config) explained

```js
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]___[hash:base64:5]' }, esModule: false },
          },
        ],
      },

      // GLOBAL CSS
      { test: /\.css$/i, exclude: /\.module\.css$/i, use: ['style-loader', 'css-loader'] },

      // SCSS MODULES
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]___[hash:base64:5]' }, esModule: false },
          },
          'sass-loader',
        ],
      },

      // GLOBAL SCSS
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.(css|scss)$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }), new Dotenv()],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          plugins: [['mozjpeg', { quality: 70 }], ['pngquant', { quality: [0.6, 0.8] }], ['svgo']],
        },
      }),
    ],
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
  },
});
```

Let’s break parts down:

- **`mode: 'production'`**
  - Enables many optimizations (minification, scope hoisting, etc.). Sets `process.env.NODE_ENV = 'production'` for libraries to disable dev-only code.

- **`output`**
  - `path: dist` — final build folder.
  - `filename: 'js/[name].[contenthash].js'` — use content-based hash for caching (when file changes, hash changes). Put JS in `js/` subfolder.
  - `chunkFilename` — names for non-entry chunks (lazy-loaded).
  - `assetModuleFilename: 'assets/[hash][ext][query]'` — filenames for `asset/resource` files (images/fonts).
  - `publicPath: '/'` — base path for all assets.

- **CSS rules in production**
  - Use `MiniCssExtractPlugin.loader` instead of `style-loader` to extract CSS into separate files.
  - Extracted CSS is better for caching and critical CSS strategies (and avoids JS needing to inject styles on load).
  - Note: you have multiple overlapping rules — the last rule `{ test: /\.(css|scss)$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] }` will catch combined cases; keep rules tidy to avoid duplication.

- **`plugins`**
  - `new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })` — extracts CSS with contenthash.
  - `new Dotenv()` — add `.env` into production builds (be careful not to commit secrets).

- **`optimization`**
  - `minimize: true` — enable minification.
  - **`minimizer`** array:
    1. `new TerserPlugin()` — minifies JS (removes whitespace, dead code elimination, compresses, mangle names).
       - **Terser** also helps with tree-shaking when combined with ES modules and `sideEffects: false` in package.json of libraries.

    2. `new CssMinimizerPlugin()` — minifies CSS (removes comments, compresses values).
    3. `new ImageMinimizerPlugin({...})` — compresses images (mozjpeg for JPEG, pngquant for PNG, svgo for SVG).
       - **Example**: a 200KB JPEG can be optimized to 40–80KB depending on quality settings.

  - `splitChunks: { chunks: 'all' }` — **code splitting**: extracts shared modules into separate chunks (vendors, commons).
    - Benefits: smaller initial bundle, better caching of vendor code.
    - Example: `node_modules/react` becomes a `vendors~...` chunk; browser caches it across deployments until version changes.

  - `runtimeChunk: 'single'` — extract webpack runtime into a single chunk (manages module mapping).
    - Benefit: when app code changes but runtime remains same, vendor and app chunks can be cached better.

---

# 7 — `postcss.config.js` (autoprefixer)

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

- **Autoprefixer** automatically adds vendor prefixes to CSS rules based on browser targets (e.g., `display: flex` → `-webkit-display: flex` where needed). Saves time and prevents cross-browser issues.

**Example**:

```css
.selector {
  display: flex;
}
```

becomes

```css
.selector {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

Autoprefixer uses `browserslist` settings in package.json or default targets.

---

# 8 — `global.d.ts` (TypeScript declaration file) explained

You put this to tell TypeScript how to interpret non-TS imports.

Contents:

```ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css';
declare module '*.scss';

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
```

- **Purpose**: When you `import styles from './App.module.css'` or `import logo from './logo.png'`, TypeScript needs to know types for these imports. Without these declarations, TS errors like `Cannot find module './xyz.png'` occur.
- **`.module.css` & `.module.scss`**: declared as objects mapping class name → generated class string.
- **plain `.css` / `.scss`**: allowed as side-effect imports (`import './global.css'`) — no typing expected.
- **image declarations**: say `import logo from './logo.png'` returns a `string` (the URL path). Helpful for typing and preventing compile errors.

---

# 9 — Extra explanations for main concepts with simple examples

## Tree shaking (explained + example)

- **What**: Removing unused exports from final bundle.
- **Why**: Reduce bundle size by eliminating dead code.
- **How**: Requires ES modules (`import` / `export`) + minifier that supports dead code elimination (Terser) + `modules: false` in Babel to preserve ESM till Webpack.
- **Example**:

  ```js
  // lib.js
  export function a() {
    /* used */
  }
  export function b() {
    /* unused */
  }

  // main.js
  import { a } from './lib';
  a();
  ```

  After tree shaking `b` is not included in final bundle.

## Code splitting (`splitChunks`) + dynamic import (example)

- **What**: Splitting vendor code & lazy-loading parts of the app.
- **Why**: Decrease initial download; load code when necessary.
- **How**: Use `import('./SomeComponent')` to create a separate chunk.
- **Example**:

  ```js
  // route lazy loading
  const Page = React.lazy(() => import('./BigPage'));
  ```

  Webpack will generate `BigPage.[hash].js` and load it when needed.

## Runtime helpers & `@babel/plugin-transform-runtime`

- **Problem**: Babel injects helper functions per file (duplication).
- **Solution**: `plugin-transform-runtime` imports helpers from `@babel/runtime`.
- **Example**: Instead of every transpiled file having a `_extends` helper, it inserts `import _extends from '@babel/runtime/helpers/extends'` and reuses it.

## Source maps (devtool)

- `eval-cheap-module-source-map`: very fast, good for development. Maps to original lines (not columns). If you want precise debugging later, use `source-map` in production for error tracking services (but it increases build time).

## Image optimization

- `ImageMinimizerPlugin` runs imagemin plugins to optimize images.
- Example: `mozjpeg` reduces `.jpg` quality while preserving visual fidelity; `pngquant` does lossy compression for PNG.

---

# 10 — Quick checklist & suggestions / small improvements

1. **TypeScript build & type checking**
   - Currently you use `ts-loader`. Consider adding `fork-ts-checker-webpack-plugin` to run type checks in a separate process for faster builds. Or switch to `babel-loader` + `@babel/preset-typescript` + `fork-ts-checker-webpack-plugin`.

2. **Avoid duplicate CSS rules**
   - In prod you have overlapping CSS rules — unify them to avoid ambiguity and ensure `postcss-loader` is present for all CSS/SCSS rules that need vendor prefixing.

3. **Environment handling**
   - Be careful with `Dotenv` in production; don't commit secrets to `.env`. Use CI/CD environment variables for production secrets.

4. **Bundle analysis**
   - Add `webpack-bundle-analyzer` to inspect what’s inside your bundles; helps find large modules to optimize.

5. **Caching & long-term caching**
   - You already use `[contenthash]` — good. Consider `crossOriginLoading` if using CDN and `preload` for critical assets.

6. **ESLint & Prettier**
   - Hook ESLint with `eslint --fix` or pre-commit hooks (`lint-staged + husky`) to auto-fix formatting and catch issues early.

7. **Source maps in production**
   - If you plan to use Sentry or a similar error tracker, generate source maps and upload them in CI (but keep them private).

---

# 11 — Short example walkthrough (how everything works end-to-end)

You run `npm run build` → webpack loads `webpack.prod.js` which:

1. Merges `webpack.common.js`.
2. Starts from `entry: './src/index.jsx'`.
3. For each `.jsx` file: `babel-loader` uses `.babelrc` → transpile modern JS/JSX. Helpers are imported from `@babel/runtime`.
4. For `.tsx`/`.ts`: `ts-loader` compiles to JS (type checking done by TypeScript).
5. CSS/SCSS files are processed by `sass-loader` → `postcss-loader` → `css-loader` → `MiniCssExtractPlugin.loader`. Final CSS goes to `css/[name].[contenthash].css`.
6. Images/fonts handled by `asset/resource` are emitted to `assets/*` and their URLs are injected into the JS files.
7. Optimization runs:
   - Tree shaking happens using ES module analysis.
   - `TerserPlugin` minifies JS (removes dead code).
   - `CssMinimizerPlugin` minifies CSS.
   - `ImageMinimizerPlugin` compresses images.
   - `splitChunks` extracts shared vendor code.

8. `HtmlWebpackPlugin` generates final `index.html` and injects `<script>` / `<link>` tags for hashed files.
9. `CleanWebpackPlugin` cleared old `dist/` at start, final files written to `dist/`.

---
