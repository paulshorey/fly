import webpack from 'webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const config = {
  entry: {
    popup: path.join(__dirname, 'src/popup.js'),
    content: path.join(__dirname, 'src/content.js'),
    background: path.join(__dirname, 'src/background.js'),
  },
  output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      //   exclude: /\.module\.css$/,
      // },
      {
        test: /\.js(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.js', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
      patterns: [{ from: 'src/manifest.json', to: '.' }],
    }),
  ],
};

export default config;
