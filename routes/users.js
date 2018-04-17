const express = require('express');
const router = express.Router({});
router.get('/', function (req, res) {
	let error = (req.session.message) ? req.session.message : null,
		success = (req.session.success) ? req.session.success : null,
		user = (req.session.user) ? req.session.user : null;
	if(user) {
		return res.redirect('/dashboard');
	}
	return res.render('users', { error: error, success: success, user: user });
});
module.exports = router;