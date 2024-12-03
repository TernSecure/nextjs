const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

async function build() {
  const commonConfig = {
    bundle: true,
    platform: 'node',
    target: 'es2020',
    external: ['react', 'react-dom', 'next', 'firebase', 'firebase-admin'],
    plugins: [nodeExternalsPlugin()],
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    outbase: 'src',
    sourcemap: true,
    minify: false,
    treeShaking: true,
  }

  // Build ESM bundle
  await esbuild.build({
    ...commonConfig,
    format: 'esm',
    entryPoints: [
      'src/index.ts',
      'src/app-router/client/index.ts',
      'src/app-router/client/config.ts',
      'src/app-router/client/client-init.ts',
      'src/app-router/server/index.ts',
      'src/components/index.ts',
    ],
    outdir: 'dist/esm',
    splitting: true,
  })

  // Build CJS bundle
  await esbuild.build({
    ...commonConfig,
    format: 'cjs',
    entryPoints: [
      'src/index.ts',
      'src/app-router/client/index.ts',
      'src/app-router/client/config.ts',
      'src/app-router/client/client-init.ts',
      'src/app-router/server/index.ts',
      'src/components/index.ts',
    ],
    outdir: 'dist/cjs',
    splitting: false,
  })
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})