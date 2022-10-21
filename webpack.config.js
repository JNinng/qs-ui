const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	// ...
	resolve: {
		extensions: ["*", ".js", ".vue"],
		alias: {
			"@": path.join(__dirname, "/src"),
		},
	},
	devServer: {
		port: 8888,
		host: "localhost",
		open: true,
	},
	mode: "development", // 开发模式
	entry: "./src/main.js", // 入口文件
	output: {
		filename: "./static/js/bundle.js", // 打包后的文件名称
		chunkFilename: "./static/js/[name].bundle.js",
		path: path.resolve(__dirname, "./output/dist"), // 打包后的目录，不用新建，打包后自动生成
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: "vue-loader" },
			{
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" },
					// { loader: "sass-loader" },
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader?name=[name].[ext]",
						options: { outputPath: "static/images/" },
					},
				], // ?name=[name].[ext] is only necessary to preserve the original file name
			},
			// {
			// 	test: /\.(gif|jpg|jpeg|png|svg)$/,
			// 	use: [
			// 		{
			// 			loader: "url-loader",
			// 			options: {
			// 				limit: 1024,
			// 				name: "[name].[ext]",
			// 			},
			// 		},
			// 	],
			// },
		],
	},
	plugins: [
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			templateParameters: {
				BASE_URL: "/",
			},
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "./static/css/[name].css",
			chunkFilename: "./static/css/[name][id].css",
		}),
	],
};
