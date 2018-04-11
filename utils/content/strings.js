'use strict';
let app = require('../../app');
app.convertTitlesToUrls = function(value){
	return value
		.toLowerCase()
		.replace(/ /g,'-')
		.replace(/[^\w-]+/g,'');
};
module.exports = app;