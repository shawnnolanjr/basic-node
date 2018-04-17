const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
const bcrypt = require('../utils/content/bcrypt');
router.post('/register', function (req, res) {
	let body = req.body,
		p1 = body.password,
		p2 = body.passwordConf;
	if((body && body.username && body.password) && (p1 === p2)) {
		body.password = bcrypt.encryptPassword(body.password);
		body.createdDate = new Date();
		UserModel.CreateUser(body, function(data){
			res.json({data: data});
			res.end();
		});
	} else {
		if(p1 !== p2) {
			res.json({err: 'Password do NOT match.'});
			res.end();
			return;
		}
		res.json({err: 'Failed'});
		res.end();
	}
});
module.exports = router;