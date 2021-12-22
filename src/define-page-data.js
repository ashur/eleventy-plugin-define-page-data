const deepmerge = require( "deepmerge" );
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

	let originalValue = dotProp.get( this.page[namespace], key );
	let newValue = value;

	if( originalValue )
	{
		if( typeof originalValue === "object" && typeof value === "object" )
		{
			newValue = deepmerge( originalValue, value );
		}
	}

	dotProp.set( this.page[namespace], key, newValue );

	// Return empty string to prevent potential rendering of 'undefined' in
	// invoking template
	return "";
};
