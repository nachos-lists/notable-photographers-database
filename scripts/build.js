
import esbuild from 'esbuild';
const esbuildSassPlugin = require('esbuild-sass-plugin');  // Correct import

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    esbuildSassPlugin()  // Use the plugin correctly
  ],
}).catch(() => process.exit(1));



