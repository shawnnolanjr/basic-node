const express = require('express');
const router = express.Router({});
const ItemModel = require('../models/ItemModel');
ItemModel.FindAllDocuments(function(err, resp) {
	router.get('/', function (req, res) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		return res.render('items', {content: 'respond with a resource', results: resp});
	});
});
module.exports = router;