import * as path from 'path';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        hot: true,
        watchFiles: path.join(__dirname, '..', 'src')
    };
}
