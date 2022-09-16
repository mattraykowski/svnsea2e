import type { UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import checker from "vite-plugin-checker";
const path = require("path");

const config: UserConfig = {
    root: 'src/',
    publicDir: path.resolve(__dirname, "public"),
    base: '/systems/svnsea2e/',
    server: {
        port: 30001,
        open: true,
        proxy: {
            '^(?!/systems/svnsea2e)': 'http://localhost:30000/',
            '/socket.io': {
                target: 'ws://localhost:30000',
                ws: true,
            },
        }
    },
    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            name: 'svnsea2e',
            entry: path.resolve(__dirname, "src/svnsea2e.ts"),
            formats: ['es'],
            fileName: 'index'
        }
    },
    plugins: [
        checker({
            typescript: true,
            // svelte: { root: __dirname },
        }),
        visualizer({
            gzipSize: true,
            template: "treemap",
        }),
    ]
}

export default config;