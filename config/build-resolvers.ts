import * as path from 'path';

import { ResolveOptions } from 'webpack';

import { BuildOptions } from './types';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    };
}
