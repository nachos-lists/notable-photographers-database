import { sassPlugin } from "esbuild-sass-plugin";
import { context } from "esbuild";

(async () => {
  // esbuild src/index.js --minify --watch --target=es6 --bundle --outfile=./index.js
  const ctx = await context({
    entryPoints: ["src/index.js", "src/index.scss"],
    bundle: true,
    outdir: "dist",
    minify: true,
    bundle: true,
    outdir: "./",
    plugins: [sassPlugin()],
  });
  ctx.watch();
})();
