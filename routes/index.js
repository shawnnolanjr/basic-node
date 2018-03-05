let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { header1: 'Express', desc: 'my desc' });
});

module.exports = router;
