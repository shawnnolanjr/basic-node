let express = require('express');
let router = express.Router();
let UserModel = require('../models/UserModel');

let foo = function (body) {
	console.log('body', body);
};

/* GET items. */
router.get('/', function (req, res, next) {
	res.render('users');
});

router.post('/', function (req, res) {
	let body = req.body;
	if(typeof body === 'object') {
		UserModel.CreateUser(body, function(err, resp){
		    console.log('err', err);
		    console.log('resp', resp);
		    if(resp) {
		    	res.redirect('/users');
		    }
		});
	}
});

module.exports = router;
