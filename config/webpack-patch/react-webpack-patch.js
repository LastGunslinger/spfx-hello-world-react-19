'use strict'

function modifyWebpackConfig(webpackConfig) {
	// If webpack's "externals" array exists, remove react and react-dom
	if (Array.isArray(webpackConfig.externals)) {
		webpackConfig.externals = webpackConfig.externals.filter(
			(external) => external !== 'react' && external !== 'react-dom'
		)
	}
}

export default modifyWebpackConfig
