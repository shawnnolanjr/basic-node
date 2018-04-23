const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
router.post('/login', function (req, res) {
	let body = req.body;
	if(body.username && body.password) {
		UserModel.Login(body, function(items){
			if(items === 'No Response') {
				res.json({redirect: '/users', error: items, items: null});
			} else {
				let dateNow = Date.now() + 60000;
				req.session.user = items;
				req.session.cookie.expires = dateNow;
				res.json({redirect: '/items', items: items});
			}
		});
	} else {
		res.json({err: 'failed'});
	}
});
module.exports = router;