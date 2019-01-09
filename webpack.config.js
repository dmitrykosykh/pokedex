const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    overlay: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  mode: 'development',
};

module.exports = (env, argv) => {
  console.log(env);
  console.log(argv);

  if (env.production) {
    config.devtool = false;
    config.mode = 'production';
    config.entry = './src/index.prod.jsx';
  } else if (env.development) {
    config.devtool = 'source-map';
    config.mode = 'development';
    config.entry = './src/index.dev.jsx';
  }

  console.log(config);

  return config;
};
