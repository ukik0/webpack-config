import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';

import { LoaderContext } from 'mini-css-extract-plugin/types/utils';
import { buildBabelLoader, buildCssLoader } from './loaders';

import { BuildOptions } from './types';

const INCLUDE_PATTERN = /\<include src=\"(\.\/)?(.+)\"\/?\>(?:\<\/include\>)?/gi;

function processNestedHtml(content: string | Buffer, loaderContext: LoaderContext, resourcePath = '') {
    let fileDir = resourcePath === '' ? path.dirname(loaderContext.resourcePath) : path.dirname(resourcePath);

    function replaceHtml(pathRule: string, src: string) {
        if (pathRule === './') {
            fileDir = loaderContext.context;
        }

        const filePath = path.resolve(fileDir, src);
        loaderContext.dependency(filePath);

        const html = fs.readFileSync(filePath, 'utf8');

        return processNestedHtml(html, loaderContext, filePath);
    }

    if (typeof content === 'string') {
        return content.replace(INCLUDE_PATTERN, replaceHtml);
    }

    return content;
}

function processHtmlLoader(content: string | Buffer, loaderContext: LoaderContext) {
    return processNestedHtml(content, loaderContext);
}

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const htmlLoader = {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
            sources: false,
            minimize: true,
            esModule: true,
            preprocessor: processHtmlLoader
        }
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    };

    const cssLoader = buildCssLoader(options.isDev);

    const babelLoader = buildBabelLoader(options.isDev);

    const imagesLoader = {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: 'asset/resource'
    };

    return [babelLoader, typescriptLoader, cssLoader, htmlLoader, imagesLoader];
}
