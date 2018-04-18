const express = require('express');
const router = express.Router({});
router.get('/', function(req, res) {
	console.log('req', req);
	return res.render('header', { brand: 'Nodejs'});
});
module.exports = router;