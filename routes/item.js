let express = require('express');
let router = express.Router({});
let ItemModel = require('../models/ItemModel');
router.get('/:name', function (req, res) {
	let data = {_id: req.query.id};
	ItemModel.FindDocumentsByType(data, function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		res.render('item', { result: resp });
	});
});
module.exports = router;