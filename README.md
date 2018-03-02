# Auto Table Filter (atf)

Auto Table Filter (atf for short, not to be confused with Alcohol, Tobacco, and Firearms in the US lol) is a project created by Marcus Parsons in 2017 in an effort to make filtering tables as easy as possible while also adding flexibility and features and keeping it lightweight.  Auto Table Filter does not rely on any outside libraries as it is written in Vanilla JavaScript. **As of right now, Auto Table Filter only supports one table per page; however, an update is planned to add support for multiple tables per page.**

## Table Of Contents
1. [How To Use Auto Table Filter](#howtouse)
2. [A Simple Example](#asimpleexample)
3. [A Better Example](#abetterexample)
4. [Required Parameters](#requiredparameters)
5. [Optional Parameters](#optionalparameters)
6. [Methods](#methods)
7. [Going Further](#goingfurther)
8. [Copyright](#copyright)
9. [Licensing](#licensing)

<a id="howtouse"></a>
## How To Use Auto Table Filter 

To use Auto Table Filter just add the reference to the stylesheet and the JavaScript library for Auto Table Filter in the `<head>` of each document where you plan on doing filtering.  If `auto-table-filter.css` and `auto-table-filter.js` are in the same directory as the page calling it, you can simply do this:
```html
<head>
	<link href="auto-table-filter.css" rel="stylesheet" />
	<script src="auto-table-filter.min.js"></script>
</head>
```
<a id="asimpleexample"></a>
## A Simple Example 
You can use Auto Table Filter by simply calling the Auto Table Filter (atf) function (after importing the styles sheet and JavaScript library) and specifying a table to filter, a container to house the filtering options (an empty div with an id is recommended), and how to submit when searching:
```javascript
var atfOptions = {
	//These are the only required parameters for Auto Table Filter
	//Supply an id for both "table" and "container"
	table: "myTable",
	container: "myContainer",
	//And how to submit when searching (either "typing" or "button")
	submitBy: "typing"
};

//And then call the atf function using the given options
var newFilter = new atf(atfOptions);
``` 
<a id="abetterexample"></a>
## A Better Example 
You can check out the [live example here](http://marcusparsons.com/atf/example/), or you can download or clone this repository, then navigate to the `example` folder and find an `index.html` file that will show you an example of the `atf` library in action.  Inside of `index.html`, you'll find `atf` being called with a few more optional parameters and some comments on what is going on.

## Parameters
Here is a list of parameters, whether they are required or optional, and what they will accept and require as inputs.

<a id="requiredparameters"></a>
### Required Parameters 
#### table (string)
The `table` parameter is required and only accepts a `string` for its input.  Use the `id` of the table you wish to provide filtering for i.e.
```javascript
//target filtering for a table with id of "myTable"
table: "myTable"
```

#### container (string)
The `container` parameter is required and only accepts a `string` for its input.  Use the `id` of the container you wish to use to hold filtering tools.  **Using an empty div with an id works best here.** i.e.
```html
<div id="myContainer"></div>
```
```javascript
//And in the atf properties:
//target filtering tools container with an id of "myContainer"
container: "myContainer"
```

#### submitBy (string)
The `submitBy` parameter is required and only accepts a `string` for its input. Use only the words `typing` or `button` to describe how you wish a user to submit a search.  **By using the keyword `typing`**, searches will happen automatically upon key presses in the search box.   **By using the keyword `button`**, searches will only happen when the user clicks the `Submit` button or presses Enter while still focused on the search box.  When a user deletes all of the text in a search box, in either mode, the table will default to show either all records or the set number of records for pagination.
```javascript
submitBy: "typing"
```
<a id="optionalparameters"></a>
### Optional Parameters 
The following parameters are optional and can be omitted or included at any given time. The accepted input type is beside the parameter name, and default values are listed in the description.  All optional parameters are technically `undefined` by default when omitted, but their behavior is what will be described as default below.

#### caseSensitive (boolean)
The `caseSensitive ` parameter is optional and only accepts a `boolean` for its input.  This parameter controls whether the search box should be case sensitive.  **By default,** this is set to `false` which means that the search box is not case sensitive.
```javascript
caseSensitive: true
```
#### columnSelect (boolean)
The `columnSelect` parameter is optional and only accepts a `boolean` for its input.  This parameter controls whether to show the column selector beside the search box.  **By default,** this is set to `true` which will show a selector with all columns and an All option.
```javascript
columnSelect: false
```

#### display (string) 
The `display` parameter is optional and only accepts a `string` for its input. This parameter controls the display of the **container**. Use the same values you would use for the CSS property `display` here i.e. `block`, `inline-block`, etc.  **By default,** display is set to `block`.
```javascript
display: "inline-block"
```

#### ignoreRows (array[strings])
The `ignoreRows` parameter is optional and only accepts an `array of strings` for its input.  This parameter controls what rows to ignore, given by class names i.e. if you have hidden rows in your table with the  class of `is-hidden` and some with the class of `not-visible`, you can include this property and these rows will be ignored when filtering. **By default,** this is `undefined`.
```javascript
ignoreRows: ["is-hidden", "not-visible"]
```

#### includeLabel (boolean)
The `includeLabel` parameter is optional and only accepts a `boolean` for its input. This parameter controls whether the default **Search:** label is present.  **By default,** this value is `true`.
```javascript
includeLabel: false
```

#### isToggleableTable (boolean)
The `isToggleableTable` parameter is optional and only accepts a `boolean` for its input. This parameter tells the filtering system whether or not to account for hidden data rows. **This is used in conjunction with the upcoming `toggleableTables` library I've created. By default,** this value is `false`.  
```javascript
isToggleableTable: true
```

#### labelText (string)
The `labelText` parameter is optional and only accepts a `string` for its input.  This parameter specifies the text to be used for the label before the search box.  **Please note that this label will only appear if `includeLabel` is omitted or set to `true`. By default,** this value is set to `Search:`.  
```javascript
labelText: "Type here to search:"
```

#### pagination (boolean)
The `pagination ` parameter is optional and only accepts a `boolean` for its input.   This parameter allows you to set pages of records for your table.  **If you set this to true, you must specify a `pagingViews` parameter. By default,** this parameter is set to `false`.  If `defaultView` is omitted, pagination defaults to the first specified value.
```javascript
pagination: false
```

#### pagingViews (array)
The `pagingViews` parameter is **required if pagination is set to true** and only accepts an `array` for its input.  This parameter sets the options for the number of records to show, with `pagination` set to `true`.   **This parameter only works when `pagination` is set to `true` and is required if `pagination` is set to `true`.**  

You can use integer, or string, values for the number of records to show and/or the `ALL` keyword (to show all records).  **If you use string values, ensure that there are only integers in the string unless using the `ALL` keyword.**  For an example of how this is used, check out the `example` provided in this repo.
```javascript
pagingViews: [5, 10, 25, 50, 100, "ALL"]
```

#### defaultView (integer/string)
The `defaultView ` parameter is optional and will accept `integer` or `string` values, although `string` values must contain only integers or the keyword `ALL`.  This parameter controls the default view to use for pagination.  If this parameter is omitted, `pagination` will select the first value of the `pagingViews` array as the default.  Also, the value specified in the `defaultView` **must exist** in the `pagingViews` array; otherwise, this parameter is ignored.
```javascript
defaultView: 50
//Or: The only string accepted that is not all integers:
//defaultView: "ALL"
```

#### searchText (string)
The `searchText ` parameter is optional and will only accept `string` values.   This parameter controls the placeholder text in the search box when a search hasn't been done yet.  **By default,** this value is `Enter a value to search for`.
```javascript
searchText: "Search for a vegetable"
```

#### styles (object)
The `styles` parameter is optional and will only accept a `well formed object`.   The `styles` object overrides a container's styles by specifying properties that are the exact same as Vanilla JS style properties. **By default,** the container has no background and white colored text. 

**A tip**: most JavaScript styles properties are the same as their CSS counterpart except that multi worded JS style properties are camel cased instead of hyphenated i.e. to set the background color and font color of a container:
```javascript
styles: {
	//in CSS, this is background-color
	backgroundColor: '#333',
	color: 'white'
}
```

There are also some default styles you can call from the `atf_styles` object. **For a list of these styles and what they look like, check out the [live styles page](http://marcusparsons.com/atf/styles/) or open up the `styles` folder in this repo and then open `index.html`.**  You can use one of these default styles easily like so:
```javascript
styles: atf_styles.ONYX
```
**Styles with gradients were gathered from excellent sites such as [uiGradients](https://uigradients.com) and [ColorZilla](http://www.colorzilla.com/gradient-editor).**

<a id="methods"></a>
## Methods
#### addPagingOpt(value)
You can call this function to add a new integer value to your paging views for pagination.  You can dynamically update the filter to have additional pages as your content expands via requests or other updates to the page. 
```javascript
var newFilter = new atf(atfOptions);
newFilter.addPagingOpt(50);
```

#### removePagingOpt(value)
You can call this function to remove a value from the pagingViews array if your content shrinks dynamically.  If this value doesn't exist in the current options, then it is just ignored.
```javascript
var newFilter = new atf(atfOptions);
newFilter.removePagingOpt(50);
```

#### update(prop, obj)
You can call this function to update properties you specified in the beginning of the filter.  Currently, you can only update the styles applied to the container and the search text property. But more will be added.  `obj` here is used loosely; the `obj` you pass in should be the same type as the parameter you are passing i.e. `styles` requires a well formed JS based styles object while `searchText` expects a string.
```javascript
var newFilter = new atf(atfOptions);

//Updating the searchText parameter
newFilter.update('searchText', 'Search for a veggie');

//Updating styles
newFilter.update('styles', {
	backgroundColor: 'dodgerblue',
	color: 'black'
});
```

<a id="goingfurther"></a>
## Going Further 
If you are confused about anything, can't get it to work no matter what you've tried, you think I've left something important out, etc. send me an email at [marcus@marcusparsons.com](marcus@marcusparsons.com).  I'll get back to you as soon as I can, I promise (generally within 24 hours).

If you have any bug fixes or implementations you'd like to see and are willing to work on, don't hesitate to submit a pull request.  

[Check out my website for more nifty projects!](http://www.marcusparsons.com)

<a id="copyright"></a>
## Copyright 
Copyright Marcus Parsons 2017-2018

## Licensing <a id="licensing"></a>

This program is free software: you can redistribute it and/or modify    
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
