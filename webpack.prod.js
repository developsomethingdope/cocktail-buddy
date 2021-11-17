const nodejsPath = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: nodejsPath.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name]-[contenthash]-bundle.js",
    path: nodejsPath.resolve(__dirname, "build"),
	assetModuleFilename: "files/[name]-[hash][ext]",
	clean: true,
	publicPath: "/"
  },
  optimization: {
    //minimize: true,
	minimizer: [
      `...`,
	  new CssMinimizerWebpackPlugin()
	]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index_template.html",
	  minify: {
		collapseWhitespace: true,
		removeComments: true
	  }
	}),
	new CopyWebpackPlugin({
      patterns: [
		{
          from: nodejsPath.resolve(__dirname, 'src/public/_redirects')
		  //to: nodejsPath.resolve(__dirname, 'build/files')
		}
	  ]
	}),
	new MiniCssExtractPlugin({
      filename: "[name]-[contenthash]-bundle.css"
	})
  ],
  module: {
    rules: [
      {
		test: /\.(js|jsx)$/i,
		exclude: /node_modules/,
		use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
			  [
			    "@babel/preset-react",
				{
			      'runtime': 'automatic'
				}
			  ]
            ],
			plugins: [
			  [
			    "@babel/transform-runtime",
				{
			      'regenerator': true
				}
			  ]
            ]
          }
        }
      },
	  {
		test: /\.scss$/i,
		use: [
          MiniCssExtractPlugin.loader, // 3) save css in a file
		  "css-loader", // 2) convert css to javascript
		  "sass-loader" // 1) convert sass to css
		]
      },
	  {
		test: /\.html$/i,
		use: ['html-loader']
      },
	  {
		test: /\.(eot|ico|gif|jpg|jpeg|otf|png|svg|ttf|woff|woff2)$/i,
		type: 'asset/resource'
      }
    ]
  }
}
