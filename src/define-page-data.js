const dotProp = require( "dot-prop" );

/**
 * @param {string} key
 * @param {*} value
 * @param {string} [namespace="data"]
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
};
