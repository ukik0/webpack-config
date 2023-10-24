import * as path from 'path';

import { buildWebpackConfig } from './config/build-webpack-config';

import { BuildEnv, BuildOptions, BuildPaths } from './config/types';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src')
    };

    const PORT = env.port || 3000;
    const mode: BuildOptions['mode'] = env.mode || 'development';
    const isDev = mode === 'development';

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT
    });
};
