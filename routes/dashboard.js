const express = require('express');
const router = express.Router({});
router.get('/', function (req, res) {
	let user = (req.session.user) ? req.session.user : null;
	if(!user) {
		res.redirect('/users');
	} else {
		res.render('dashboard', { user: user });
	}
});
module.exports = router;