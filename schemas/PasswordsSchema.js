'use strict';
const mongoose = require('mongoose');
const PasswordsSchema = new mongoose.Schema({
	site: {
		type: String,
		trim: true
	},
	user: {
		type: String,
		trim: true
	},
	pword: {
		type: String,
		trim: true
	},
});
const Collection = mongoose.model('Pword', PasswordsSchema);
module.exports = Collection;