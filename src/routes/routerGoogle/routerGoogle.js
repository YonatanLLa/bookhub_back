const { Router } = require("express");
const cors = require("cors");
const routerGoogle = Router();

const session = require('express-session');
const passport = require('passport');
require('./auth');

const corsOptions = {
	origin: "*",
	credentials: true, // Permitir el envío de cookies y credenciales
	methods: "GET, POST, OPTIONS, PUT, DELETE", // Métodos HTTP permitidos
	allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept", // Encabezados permitidos
};

routerGoogle.use(cors(corsOptions));

function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
  }
  
routerGoogle.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
routerGoogle.use(passport.initialize());
routerGoogle.use(passport.session());
  
routerGoogle.get('/google', (req, res) => {

	console.log(req.user);
	res.send('<a href="/auth/google">Authenticate with Google</a>');
});
  
routerGoogle.get('/auth/google',
	passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
  
routerGoogle.get('/auth/google/callback',
	passport.authenticate( 'google', {
	  successRedirect: '/protected',
	  failureRedirect: '/auth/google/failure'
	})
);
  
routerGoogle.get('/protected', isLoggedIn, (req, res) => {
	console.log(req.user);
	res.send(`Hello ${req.user.name}`);
});
  
routerGoogle.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('Goodbye!');
});
  
routerGoogle.get('/auth/google/failure', (req, res) => {
	res.send('Failed to authenticate..');
});

module.exports = routerGoogle;
