
// import esbuild from 'esbuild';
// import esbuildSassPlugin from 'esbuild-sass-plugin';  // Import the SCSS plugin

// esbuild.build({
  // entryPoints: ['src/index.js'],
  // bundle: true,
  // outfile: 'dist/bundle.js',
  // plugins: [
    // esbuildSassPlugin()  // Add the SCSS plugin here
  // ],
// }).catch(() => process.exit(1));

// import { build } from "esbuild";
// (async () => {
  // await build({
    // entryPoints: ["src/index.js", "src/index.scss"],
    // bundle: true,
    // outdir: "dist",
    // minify: true,
    // bundle: true,
    // outdir: "./",
  // });
// })();

const esbuild = require('esbuild');
const esbuildSassPlugin = require('esbuild-sass-plugin');  // Correct import

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    esbuildSassPlugin()  // Use the plugin correctly
  ],
}).catch(() => process.exit(1));
