import ImageMinimizerPlugin, { PluginOptions } from 'image-minimizer-webpack-plugin';

export function buildOptimization(): ImageMinimizerPlugin<unknown, unknown> {
    return new ImageMinimizerPlugin({
        minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
                plugins: ['imagemin-gifsicle', 'imagemin-mozjpeg', 'imagemin-pngquant', 'imagemin-svgo']
            }
        }
    });
}
