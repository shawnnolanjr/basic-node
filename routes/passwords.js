const express = require('express');
const router = express.Router({});
const CollectionModel = require('../models/PasswordModel');
router.get('/', function (req, res) {
	let user = (req.session.user) ? req.session.user : null;
	if(!user) {
		return res.redirect('/users');
	}
	if(user.roles.indexOf('Admin') !== -1 || user.roles.indexOf('Admin') > 0) {
		CollectionModel.GetPasswords(user, function(resp){
			return res.render('passwords', { user: user });
		});
	} else {
		return res.render('dashboard', { user: user });
	}
});
module.exports = router;