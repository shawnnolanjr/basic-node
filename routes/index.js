let express = require('express');
let router = express.Router({});
router.get('/', function(req, res, next) {
	return res.render('index', { header1: 'Express', desc: 'my desc' });
});
module.exports = router;
