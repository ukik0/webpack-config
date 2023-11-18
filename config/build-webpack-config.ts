import webpack from 'webpack';

import { buildPlugins, buildOptimization, buildLoaders, buildResolvers, buildDevServer } from './index';

import { BuildOptions } from './types';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: isDev ? '/' : './'
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: {
            minimize: true,
            minimizer: [buildOptimization()]
        }
    };
}
