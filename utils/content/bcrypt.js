'use strict';
const bcrypt = require('bcryptjs');
let app = require('../../app');
let salt = bcrypt.genSaltSync(10);
app.encryptPassword = function(value){
	return bcrypt.hashSync(value, salt);
};
app.decryptPassword = function(value) {
	let hash = bcrypt.hashSync(value, salt);
	return bcrypt.compareSync(value, hash);
};
module.exports = app;