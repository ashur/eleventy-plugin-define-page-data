/* global beforeEach, describe, it */
const {assert} = require( "chai" );
const definePageData = require( "../src/define-page-data" );

describe( "definePageData", () =>
{
	let getEleventyData = () =>
	{
		return {
			page: {
				date: new Date(),
				inputPath: "./src/foo.njk",
				fileSlug: "/foo",
				filePathStem: "/foo",
				url: "/foo/",
				outputPath: "dist/foo/index.html"
			},
		};
	};

	let mockDefinePageData, mockEleventyData;
	beforeEach( () =>
	{
		mockEleventyData = getEleventyData();
		mockDefinePageData = definePageData.bind( mockEleventyData );
	});

	it( "should throw if this.page is not an object", () =>
	{
		let definePageData_pageUndefined = definePageData.bind( {} );
		let fnUndefined = () => definePageData_pageUndefined( "key", "value" );
		assert.throws( fnUndefined, "Missing required object 'page'" );

		let definePageData_pageString = definePageData.bind( { page: "I am a page" } );
		let fnNotObject = () => definePageData_pageString( "key", "value" );
		assert.throws( fnNotObject, "Missing required object 'page'" );
	});

	it( "should set using page.data namespace by default", () =>
	{
		let defaultNamespace = "data";
		assert.isUndefined( mockEleventyData.page[defaultNamespace] );

		mockDefinePageData( "newKey", "newValue" );

		assert.isObject( mockEleventyData.page[defaultNamespace] );
		assert.equal( mockEleventyData.page[defaultNamespace].newKey, "newValue" );
	});

	it( "should set using custom namespace if provided", () =>
	{
		let customNamespace = "customNamespace";
		assert.isUndefined( mockEleventyData.page[customNamespace] );

		mockDefinePageData( "newKey", "newValue", customNamespace );

		assert.isObject( mockEleventyData.page[customNamespace] );
		assert.equal( mockEleventyData.page[customNamespace].newKey, "newValue" );
	});

	it( "should support nested keys", () =>
	{
		mockDefinePageData( "newObject.newKey", "newValue" );

		assert.isObject( mockEleventyData.page.data.newObject );
		assert.equal( mockEleventyData.page.data.newObject.newKey, "newValue" );
	});

	it( "should return empty string", () =>
	{
		let expected = "";
		let actual = mockDefinePageData( "newKey", "newValue" );

		assert.equal( actual, expected, "Return value" );
	});

	it( "should merge existing object properties", () =>
	{
		let originalPrefs = {
			shape: "circle",
			size: {
				height: 1,
				width: 2,
			},
		};

		mockEleventyData.page.data = {
			prefs: originalPrefs,
		};

		let newPrefs = {
			color: "red",
		};

		mockDefinePageData( "prefs", newPrefs );

		assert.hasAllKeys( mockEleventyData.page.data.prefs, ["color", "shape", "size"] );
		assert.hasAllKeys( mockEleventyData.page.data.prefs.size, ["height", "width"] );
	});
});
