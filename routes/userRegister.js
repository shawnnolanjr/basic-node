const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
const bcrypt = require('../utils/content/bcrypt');

/* POST users */
// @todo: need to put this post at its own endpoint outside of users route.
router.post('/register', function (req, res, next) {
	let body = req.body;
	if(body && body.username && body.password) {
		body.password = bcrypt.encryptPassword(body.password);
		body.createdDate = new Date();
		UserModel.CreateUser(body, function(data){
			res.json({data: data});
			res.end();
		});
	} else {
		res.json({err: 'failed'});
		res.end();
	}
});

module.exports = router;