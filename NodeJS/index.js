const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/userController.js');


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:4200','http://127.0.0.1:4200'], credentials:true}));

//passport
var passport = require('passport');
var session = require('express-session');

app.use(session({
	name:'sessionname.sid',
	resave:false,
	saveUninitialized:false,
	secret:"secret",
	cookie:{
		maxAge:36000000,
		httpOnly:false,
		secure:false 
	}
}))

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/employees', employeeController);
app.use('/user', userController);