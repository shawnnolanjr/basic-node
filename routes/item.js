let express = require('express');
let router = express.Router();
let ItemModel = require('../models/ItemModel');

/* GET ItemModel data. */
router.get('/:name', function (req, res) {
	let id = req.query.id;
	ItemModel.findDocument(id, function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		res.render('item', { result: resp });
	});
});

module.exports = router;