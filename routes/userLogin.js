const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
router.post('/login', function (req, res) {
	let body = req.body;
	if(body.username && body.password) {
		UserModel.Login(body, function(data){
			req.session.user = data;
			res.json({redirect: '/dashboard', data: data});
			res.end();
		});
	} else {
		res.json({err: 'failed'});
		res.end();
	}
});
module.exports = router;