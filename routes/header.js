let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('req', req);
	res.render('header', { title: 'this is my title'});
});

module.exports = router;
