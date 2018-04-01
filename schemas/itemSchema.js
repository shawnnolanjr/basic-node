'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// require('../app');

const ItemSchema = new Schema({
	item: {
		type: String,
		required: true
	},
	qty: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	size: {
		type: Object,
		required: true
	},
	tags: {
		type: Array,
		required: true
	}
});
let Item = mongoose.model('Item', ItemSchema);
module.exports = Item;