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
		// @todo: need change "required" to a function that should validate for certain type of passwords.
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
	createdDate: {
		type: Date,
		required: true
	}
});
const User = mongoose.model('User', UserSchema);

module.exports = User;