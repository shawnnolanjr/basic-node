const express = require('express');
const router = express.Router({});
router.get('/', function (req, res) {
    let user = (req.session.user) ? req.session.user : null;
    console.log('user', user)
    res.render('users', {user: user});
});
module.exports = router;