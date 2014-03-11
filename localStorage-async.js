function localStorage () {
	var fs = require('fs'),
		path = require('path'),
		_this = this,
		location = './localStorage',
		encoding = "utf-8",
		cache = {};

	this.length = 0;
	
	this.configure = function (configs, callback){
		if (typeof configs == "object") {
			if (typeof configs.database == "string") {
				this.setLocation(configs.database);
			};
			if (typeof configs.encoding == "string") {
				this.setEncoding(configs.encoding);
			};
			callback(null, true);
			return;
		};
		callback(err, null);
	};

	this.setLocation = function (loc, rem, callback){
		if (rem) {
			fs.rmdir(location, function (){
				_this.setLocation(loc, false, callback);
			});
			return;
		};
		location = "".concat(loc).toString();
		if (typeof callback == 'function')
			check_location(callback);
		else
			check_location();
	};

	this.getLocation = function (callback){
		if (typeof callback == "function") {
			callback(location);
			return;
		}
	};

	this.setEncoding = function (encoding, callback){
		// Additional for adding encoding
		encoding = encoding.toString();
		if (typeof callback == 'function') {
			callback();
		};
	};

	this.getEncoding = function (callback){
		if (typeof callback == 'function') {
			callback(encoding);
			return
		};
	};

	this.setItem = function (name, value, callback){
		if (!name || !value) {
			console.log("Please specify name and / or value");
			return;
		};
		var filename = path.join(location, encodeURIComponent(name.toString())),
			value = value.toString();

		this.length++;
		cache[name.toString()] = value;

		fs.writeFile(filename, value, encoding, function (err, data){
			if (callback)
				callback(err, data);
			else
				return data;
		});
	};

	this.getItem = function (name, callback){
		if (cache[name]) {
			if (callback)
				callback(null, cache[name].toString());
			return;
		};

		var filename = path.join(location, encodeURIComponent(name.toString()));
		
		fs.readFile(filename, function (err, data){
			if (data)
				cache[name] = data.toString();
			if (callback)
				callback(err, data);
			else
				return data;
		});
	};

	this.removeItem = function (name, callback){
		var filename = path.join(location, encodeURIComponent(name.toString()));

		this.length--;
		delete cache[name];

		fs.unlink(filename, function (err, data){
			if (callback) 
				callback(err, data);
			else
				return data;
		});
	};

	this.clear = function (callback){
		fs.readdir(location, function (err, data){
			data.forEach(function(data) {
				_this.removeItem(data);
			});
			if (callback)
				callback();
		});
	};

	this.valueOf = function (callback){
		fs.readdir(location, function (err, names){
			if (err) {
				callback(err, null);
				return;
			};
			if (names) {
				names.forEach(function(name) {
					_this.getItem(name, function (err, value){
						if (err) {
							callback(err, null);
							return;
						};
						cache[name] = value.toString();
						_this.length++;
					});
				});
				if (callback)
					callback(null, cache);
				else
					return cache;
			}
		});
	};

	function check_location (callback){
		var loc = location.toString();
		fs.exists(loc, function (state){
			if (state) {
				fs.stat(loc, function (data) {
					if (typeof callback == 'function')
						callback();
				});
			} else {
				fs.mkdir(loc, function (err, data){
					if (typeof callback == 'function')
					callback();
				});
			}
		});
	};

	function getLength (){
		fs.readdir(location, function (err, names){
			if (names) {
				names.forEach(function(name) {
					_this.length++;
				});
			}
		});
	};

	(function () {
		// Start up
		check_location();
		getLength();
	})();
};

module.exports = new localStorage();
