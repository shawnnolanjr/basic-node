let express = require('express');
let router = express.Router();
let item = require('../models/ItemModel');

/* GET item data. */
router.get('/:name', function (req, res) {
	let id = req.query.id;
	item.findDocument(id, function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		res.render('item', { result: resp });
	});
});

module.exports = router;