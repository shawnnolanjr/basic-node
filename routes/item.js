const express = require('express');
const router = express.Router({});
const ItemModel = require('../models/ItemModel');
const strings = require('../utils/content/strings');
router.get('/:name', function (req, res) {
	let data = {_id: req.query.id};
	ItemModel.FindDocumentsByType(data, function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		resp.title = strings.convertCase(resp.title);
		res.render('item', { result: resp });
	});
});
module.exports = router;