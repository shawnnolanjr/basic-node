let express = require('express');
let router = express.Router();
let UserModel = require('../models/UserModel');

/* GET users view. */
router.get('/', function (req, res, next) {
	let message = (req.session.message) ? req.session.message : null;
	res.render('users', { err: message });
});

router.post('/', function (req, res) {
	let body = req.body;
	if(typeof body === 'object') {
		UserModel.CreateUser(body, function(err, resp){
		    if(err) {
			    req.session.message = err.message;
			    return res.redirect('users');
		    }
		    if(resp) {
			    req.session.message = null;
		    	return res.redirect('users');
		    }
		});
	}
});

module.exports = router;
