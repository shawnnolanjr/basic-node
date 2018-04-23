const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
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

// Engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( 'handlebars', exphbs({
	extname: 'handlebars',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	// helpers: require('./helpers/handlebars.js').helpers
}));
app.set('view engine', 'handlebars');

// controllers
let index = require('./routes/index');
let items = require('./routes/items');
let item = require('./routes/item');
let users = require('./routes/users');
let userLogout = require('./routes/userLogout');
let dashboard = require('./routes/dashboard');

// Routes
app.use('/', index);
app.use('/items', items);
app.use('/item', item);
app.use('/users', users);
app.use('/logout', userLogout);
app.use('/dashboard', dashboard);

// API routes
let userRouter = express.Router({});
let userRegister = require('./routes/userRegister');
let userLogin = require('./routes/userLogin');
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/logut', userLogin);
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