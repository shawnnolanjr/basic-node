let express = require('express');
let router = express.Router({});
router.get('/', function(req, res, next) {
	res.render('index', {header1: 'My header', desc: 'My Desc'});
});
module.exports = router;
