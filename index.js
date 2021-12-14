const definePageData = require( "./src/define-page-data" );

/**
 * @param {UserConfig} eleventyConfig
 */
module.exports = (eleventyConfig) =>
{
	eleventyConfig.addShortcode( "definePageData", definePageData );
};
