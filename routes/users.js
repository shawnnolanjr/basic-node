const express = require('express');
const router = express.Router({});
const UserModel = require('../models/UserModel');
const bcrypt = require('../utils/content/bcrypt');

/* GET users view. */
router.get('/', function (req, res, next) {
	let error = (req.session.message) ? req.session.message : null;
	let success = (req.session.success) ? req.session.success : null;
	let user = (req.session.user) ? req.session.user : null;
	return res.render('users', { error: error, success: success, user: user });
});

module.exports = router;