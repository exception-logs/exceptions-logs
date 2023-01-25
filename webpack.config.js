const path = require('path')
const nodeExternals = require('webpack-node-externals')
const glob = require('glob')



module.exports = {
  entry: {
    exception: glob.sync('./src/exception.ts'),
    index: glob.sync('./src/index.ts'),
    required: glob.sync('./src/required.ts')
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: 'true',
      cacheGroups: {
        vendors: { /* Os bundles vendor foram gerados por conta dessa regra */
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
}
