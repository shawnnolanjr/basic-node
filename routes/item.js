let express = require('express');
let router = express.Router();
let item = require('../models/Item');

/* GET item data. */
router.get('/:id', function (req, res, next) {
	let thisRes = res;
	item.findDocument(req.params.id, function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		thisRes.render('item', { result: resp });
	});
});

module.exports = router;
