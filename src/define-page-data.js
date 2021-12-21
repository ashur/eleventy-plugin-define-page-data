const dotProp = require( "dot-prop" );

/**
 * @param {string} key
 * @param {*} value
 * @param {string} [namespace="data"]
 * @returns {string}
 */
module.exports = function(key, value, namespace="data")
{
	if( typeof this.page !== "object" )
	{
		throw new Error( "Missing required object 'page'" );
	}

	if( !this.page[namespace] )
	{
		this.page[namespace] = {};
	}

	dotProp.set( this.page[namespace], key, value );

	// Return empty string to prevent potential rendering of 'undefined' in
	// invoking template
	return "";
};
