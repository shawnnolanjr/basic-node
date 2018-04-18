'use strict';
let app = require('../../app');
app.convertTitlesToUrls = function(value){
	return value
		.toLowerCase()
		.replace(/ /g,'-')
		.replace(/[^\w-]+/g,'');
};
app.convertCase = function(str) {
	let lower = String(str).toLowerCase();
	return lower.replace(/(^| )(\w)/g, function(x) {
		return x.toUpperCase();
	});
}
module.exports = app;