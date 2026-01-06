'use strict'

function modifyWebpackConfig(webpackConfig) {
	// Remove react and react-dom from webpack's externals array to ensure they are included in the bundle
	if (Array.isArray(webpackConfig.externals)) {
		webpackConfig.externals = webpackConfig.externals.filter(
			(external) => external !== 'react' && external !== 'react-dom'
		)
	}
}

export default modifyWebpackConfig
