import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
export default  {
    input: 'src/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'es',
            sourcemap: true,
        }
    ],
    plugins: [   
        resolve({
            browser: true,
        }),
        json(),
        typescript()
    ],
};