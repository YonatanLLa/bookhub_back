const { Router } = require("express");

const routerGoogle = Router();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const generaJsonWebToken = require("../../jwt/generajwt");
require('./auth');

const corsOptions = {
	origin: '*',
	credentials: true, // Permitir el envío de cookies y credenciales
  };
  
  routerGoogle.use(cors(corsOptions));

function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
  }
  
routerGoogle.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
routerGoogle.use(passport.initialize());
routerGoogle.use(passport.session());

  
routerGoogle.get('/google', (req, res) => {
	//res.send('<a href="/auth/google">Authenticate with Google</a>');
	res.redirect("/auth/google")
});
  
routerGoogle.get("/auth/google", (req, res) => {
	try {
		const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth" +
		  "?response_type=code" +
		  "&redirect_uri=https://servidor-libreria.onrender.com/auth/google/callback" +
		  "&scope= email profile" +
		  "&client_id=582695265371-5c11lptg39sbffmv67tocl8lde8f47st.apps.googleusercontent.com";
	  console.log("dd")
		// Devuelve la URL de autenticación de Google al cliente
		res.json({ authUrl: googleAuthUrl });
	} catch (error) {
		console.log("error",error.message)
		res.status(401).send(error.message)
	}
  });
  
/*routerGoogle.get('/auth/google/callback',
	passport.authenticate( 'google', {
		successRedirect: "http://localhost:5173/home",
		failureRedirect: "/auth/google/failure"
	})
);*/

routerGoogle.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
	const token = generaJsonWebToken(req.user.id, req.user.email) 
	console.log("token-route", token)
	console.log("token-route-req", req.user.token)
  // Aquí redireccionas al frontend con el token de acceso u otra información relevante
  res.redirect('http://127.0.0.1:5173/home?token=' + token); // Suponiendo que req.user.token contiene el token de acceso
}
);
  
routerGoogle.get('http://127.0.0.1:5173/home', isLoggedIn, (req, res) => {
	console.log("req.user",req.user);
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
