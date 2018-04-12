'use strict';
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	roles: {
		type: Array,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	// @todo: might not need this, since this is adding it to the db...
	// passwordConf: {
	// 	type: String,
	// 	required: function() {
	// 		return this.password === this.passwordConf;
	// 	},
	// }
	// @todo: create a CreatedDate type
});
const User = mongoose.model('User', UserSchema);

module.exports = User;