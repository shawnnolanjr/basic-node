'use strict';
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	attachments: {
		type: Array,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;