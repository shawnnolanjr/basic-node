const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
// const bcrypt = require('bcryptjs');

/* GET users view. */
router.get('/', function (req, res, next) {
	let error = (req.session.message) ? req.session.message : null;
	let success = (req.session.success) ? req.session.success : null;
	let user = (req.session.user) ? req.session.user : null;
	res.render('users', { error: error, success: success, user: user });
});

router.post('/', function (req, res) {
	let body = req.body;
	req.session.user = {};
	req.session.user.email = body.email;
	req.session.user.username = body.username;
	if(typeof body === 'object') {
		// @todo: need to compare passwords
		if(body.password !== body.passwordConf) {
			let err = { message: 'Passwords don\'t match' };
			req.session.success = null;
			req.session.message = err.message;
			return res.redirect('users');
		}
		UserModel.CreateUser(body, function(err, resp){
		    if(err) {
			    req.session.success = null;
			    req.session.message = err.message;
			    return res.redirect('users');
		    }
		    if(resp) {
			    req.session.message = null;
			    req.session.success = 'Successful';
		    	return res.redirect('users');
		    }
		});
	}
});

module.exports = router;