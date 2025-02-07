import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
    entry: ['./src/**/*.{ts,tsx,js,jsx}'],
    bundle: false,
    sourcemap: true,
    clean: true,
    minify: false,
    legacyOutput: true
};

const esmConfig: Options = {
    ...config,
    format: 'esm'
};

const cjsConfig: Options = {
    ...config,
    format: 'cjs',
    outDir: './dist/cjs'
};

export default defineConfig([
    esmConfig,
    cjsConfig,
]);