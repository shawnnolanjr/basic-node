const express = require('express');
const router = express.Router({});
const ItemModel = require('../models/ItemModel');
router.get('/', function (req, res) {
	let user = (req.session.user) ? req.session.user : null;
	if(!user) {
		return res.redirect('/');
	} else {
		ItemModel.FindAllDocuments(function(resp) {
			resp = (resp) ? resp : 'No inventory';
			return res.render('items', {content: 'respond with a resource', results: resp});
		});
	}
});

module.exports = router;