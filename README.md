# eleventy-plugin-define-page-data

An Eleventy data plugin to make any data available to shortcodes using the `page` data object.

## Setup

To install this plugin, run the following command at the root of your Eleventy project:

```
npm install --save @aaashur/eleventy-plugin-define-page-data
```

Next, import the plugin in your `.eleventy.js` config file:

```
const definePageData = require("@aaashur/eleventy-plugin-define-page-data");
```

Finally, register the plugin somewhere inside your exported configuration function:

```javascript
module.exports = eleventyConfig =>
{
	eleventyConfig.addPlugin(definePageData);

	// ...
};
```

## Usage

Create a new page data variable using the `definePageData` shortcode:

```nunjucks
{% definePageData key, value %}
```

For example:

```nunjucks
{% definePageData "prefersEmoji", false %}
```

Data added to the `page` object using `definePageData` is namespaced to prevent stomping over existing data properties that are created and used by Eleventy. By default, the `data` namespace is used:

```javascript
{
    date: new Date(),
    inputPath: "./current/page/myFile.md",
    fileSlug: "myFile",
    filePathStem: "/current/page/myFile",
    url: "/current/page/myFile/",
    outputPath: "./_site/current/page/myFile/index.html",

    data: {
        prefersEmoji: false
    }
}
```

To access this data in your shortcode source, use `this.page.data`:

```javascript
/**
 * Add random emoji to the end of a string
 * @param {string} text
 * @returns {string}
 */
module.exports = function(text)
{
    if( !this.page.data.prefersEmoji )
    {
        return text;
    }
    else
    {
        // ...
    }
}
```

> 🎈 **Note** — You must define your shortcode with a traditional `function()` rather than an arrow function in order for Eleventy to [bind page data](https://www.11ty.dev/docs/languages/nunjucks/#access-to-page-data-values) to your shortcode.

The `definePageData` shortcode also supports defining nested properties:

```nunjucks
{% definePageData "user.preferences.prefersEmoji", false %}
```

```javascript
{
    // ...

    data: {
        user: {
            preferences: {
                prefersEmoji: false
            }
        }
    }
}
```

### Namespace

You can use a custom namespace instead of the default `data`:

```nunjucks
{% definePageData "prefersEmoji", false, "customData" %}
```

```javascript
{
    // ...

    customData: {
        prefersEmoji: false
    }
}
```
