const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
router.post('/login', function (req, res) {
	let body = req.body;
	if(body.username && body.password) {
		UserModel.Login(body, function(data){
			let dateNow = Date.now() + 60000;
			req.session.user = data;
			req.session.cookie.expires = dateNow;
			res.json({redirect: '/dashboard', data: data});
		});
	} else {
		res.json({err: 'failed'});
	}
});
module.exports = router;