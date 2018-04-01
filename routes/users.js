let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());

let foo = function (body) {
	console.log('body', body);
};

/* GET items. */
router.get('/', function (req, res, next) {
	res.render('users');
});

router.post('/', function (req, res) {
	console.log(req.body);
	// sending a response does not pause the function
	foo(req.body);
	res.send(200);
});

module.exports = router;
