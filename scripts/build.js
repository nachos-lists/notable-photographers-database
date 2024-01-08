import { build } from "esbuild";
(async () => {
  await build({
    entryPoints: ["src/index.js", "src/index.scss"],
    bundle: true,
    outdir: "dist",
    minify: true,
    bundle: true,
    outdir: "./",
  });
})();
