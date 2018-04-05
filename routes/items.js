let express = require('express');
let router = express.Router();
let ItemModel = require('../models/ItemModel');

/* GET items. */
router.get('/', function (req, res, next) {
	ItemModel.findDocuments(function(err, resp) {
		if(err) throw err;
		resp = (resp) ? resp : 'No inventory';
		res.render('items', {content: 'respond with a resource', results: resp});
	});
});

module.exports = router;
