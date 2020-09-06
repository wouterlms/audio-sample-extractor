export default {

	/*
	** Server settings
	*/
	server: {
		host: 'localhost',
		port: 3000,
	},

	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	mode: 'universal',
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'server',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ ref: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap' },
		]
	},
	/*
	** Global CSS
	*/
	css: [
		'~assets/scss/_variables.scss',
		'~assets/scss/_reset.scss',
		'~assets/scss/_mixins.scss',
	],

	/*
	** Default page transition
	*/
	pageTransition: {
		name: 'default',
		mode: '',
	},

	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxt/typescript-build',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/style-resources'
	],

	styleResources: {
		scss: ['./assets/scss/*.scss']
	},

	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
	},

	transpileDependencies: [
		'vuex-module-decorators'
	],

	// build: {
	// 	extend(config, { isDev, isClient }) {

	// 		config.module.rules.push(
	// 			{
	// 				test: /\.worker\.js$/,
	// 				use: { loader: 'worker-loader' },
	// 			}
	// 		);

	// 		if (isDev) {
	// 			config.mode = 'development'
	// 		}
	// 	}
	// }
}
