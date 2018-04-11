const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

/* GET users view. */
router.get('/', function (req, res, next) {
	let error = (req.session.message) ? req.session.message : null;
	let success = (req.session.success) ? req.session.success : null;
	res.render('users', { error: error, success: success });
});

router.post('/', function (req, res) {
	let body = req.body;
	if(typeof body === 'object') {
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
