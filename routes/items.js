const express = require('express');
const router = express.Router({});
const ItemModel = require('../models/ItemModel');
router.get('/', function (req, res) {
	let user = (req.session.user) ? req.session.user : null;
	if(!user) {
		res.redirect('/users');
	} else {
		ItemModel.FindAllDocuments(function(resp) {
			resp = (resp) ? resp : 'No inventory';
			res.render('items', {content: 'respond with a resource', results: resp});
		});
	}
});
module.exports = router;