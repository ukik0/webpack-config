import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin';

import { BuildOptions } from './types';

const PAGES_DIR = path.join(__dirname, '../src');
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

export function buildPlugins({ isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '..', 'src', 'images'),
                    to: path.resolve(__dirname, '..', 'build', 'images')
                },
                {
                    from: path.resolve(__dirname, '..', 'src', 'videos'),
                    to: path.resolve(__dirname, '..', 'build', 'videos')
                },
                {
                    from: path.resolve(__dirname, '..', 'src', 'fonts'),
                    to: path.resolve(__dirname, '..', 'build', 'fonts')
                }
            ]
        }),
        new ImageminWebpWebpackPlugin({
            config: [
                {
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality: 75
                    }
                }
            ],
            overrideExtension: true,
            detailedLogs: false,
            silent: false,
            strict: true
        }),
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, '../src', `${page}`),
                    filename: `${page}`,
                    chunks: 'all'
                })
        )
    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
}
