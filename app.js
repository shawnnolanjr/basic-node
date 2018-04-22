const express = require('express');
const cons = require('consolidate');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dbConfig = require('./utils/db/connect/db.conect');
dbConfig.mongoConnect(function(){});
// let favicon = require('serve-favicon');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
	secret: 'someSecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		// secure: true,
		expires: new Date(Date.now())
	}
}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// assign the swig engine to .html files
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Routers
let userRouter = express.Router({});
// controllers
let index = require('./routes/index');
let items = require('./routes/items');
let item = require('./routes/item');
let users = require('./routes/users');
let userRegister = require('./routes/userRegister');
let userLogin = require('./routes/userLogin');
let userLogout = require('./routes/userLogout');
let dashboard = require('./routes/dashboard');
let passwords = require('./routes/passwords');
// basic site routes
app.use('/', index);
app.use('/items', items);
app.use('/item', item);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/passwords', passwords);
app.use('/logout', userLogout);
// user api related routes
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
app.use('/api/v1', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
	next();
});

module.exports = app;
