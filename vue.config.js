const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: "/",
	css: {
		loaderOptions: {
			scss: {
				additionalData: '@import "./assets.scss/XxMenu.scss"',
			},
		},
	},
});
