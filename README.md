localStorage-async
===================

![](https://david-dm.org/ThomasK33/localStorage-async.svg)

Abstraction of HTML5's localStorage with added asynchronity for node

Usage
-----

```javascript
	var localStorage = require("localstorage-async");

	/**
	 * [configure - quick setup of localStorage]
	 * @param  {object}   configs  [Quick configuration of localStorage. exmaple: {location: "localDB", encoding: "utf-8"}]
	 * @param  {Function} callback [Function to be executed when finished]
	 */
	localStorage.configure(configs, callback);

	/**
	 * [setLocation - set localStorage's current directory]
	 * @param {String}   location      [The directory which should be used]
	 * @param {Boolean}   remove      [Delete currently used directory?]
	 * @param {Function} callback [Function to be executed when finished]
	 */
	localStorage.setLocation(location, remove, callback);

	/**
	 * [getLocation - get localStorage's current directory]
	 * @param  {Function} callback ({String} location) [Function gets current (String) location passed]

	 */
	localStorage.getLocation(callback);

	/**
	 * [setEncoding - set the encoding]
	 * @param {String}   encoding [Encoding which should be used]
	 * @param {Function} callback [Function to be executed when finished]
	 */
	localStorage.setEncoding(encoding, callback);

	/**
	 * [getEncoding - get the current encoding]
	 * @param  {Function} callback ({String} encoding) [Function gets current (String) encoding passed]
	 */
	localStorage.getEncoding(callback);

	/**
	 * [setItem - Set a specific item]
	 * @param {String}   name     [Name of the Item to be set]
	 * @param {String}   value    [Value of the Item]
	 * @param {Function} callback (err, data) [Function to be executed when finished]
	 */
	localStorage.setItem(name, value, callback);

	/**
	 * [getItem - get a specific Item from localStorage]
	 * @param  {String}   name     [Name of the Item]
	 * @param  {Function} callback (err, data) [Function to be executed when finished]
	 */
	localStorage.getItem(name, callback);

	/**
	 * [removeItem - remove a special Item from localStorage]
	 * @param  {String}   name     [Name of the Item that will be removed]
	 * @param  {Function} callback (err, data) [Function to be executed when finished]
	 */
	localStorage.removeItem(name, callback);

	/**
	 * [clear - Remove every item in localStorage]
	 * @param  {Function} callback [Function to be executed when finished]
	 */
	localStorage.clear(callback);

	/**
	 * [valueOf - get every Item in localStorage]
	 * @param  {Function} callback (err, data) [Function to be executed when finished]
	 */
	localStorage.valueOf(callback);
```
