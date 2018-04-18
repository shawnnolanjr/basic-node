const express = require('express');
const router = express.Router({});
router.get('/', function (req, res) {
	let user = (req.session.user) ? req.session.user : null;
	if(!user) {
		return res.redirect('/users');
	}
	return res.render('dashboard', { user: user });
});
module.exports = router;