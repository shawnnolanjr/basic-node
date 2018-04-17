const express = require('express');
const router = express.Router({});
const ItemModel = require('../models/ItemModel');
router.get('/', function (req, res) {
	ItemModel.FindAllDocuments(function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		res.render('items', {content: 'respond with a resource', results: resp});
	});
});

module.exports = router;