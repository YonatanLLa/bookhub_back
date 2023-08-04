const { Router } = require("express");
const cors = require("cors");
const routerGoogle = Router();
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
	if(req.user.isActive === true){
		const token = generaJsonWebToken(req.user.id, req.user.email, req.user.admin) 
		//console.log("token-route", token)
		//console.log("token-route-req", req.user)
		const obj = { token: token, admin: req.user.admin };
		const objString = JSON.stringify(obj); // Convertir el objeto a una cadena JSON válida
	
		// Aquí redireccionas al frontend con el token de acceso u otra información relevante
		res.redirect('https://mybookhub.vercel.app/home?token=' + encodeURIComponent(objString));
	  }else{
		res.redirect('https://mybookhub.vercel.app/home');
	}
});
  
routerGoogle.get("https://mybookhub.vercel.app/home", isLoggedIn, (req, res) => {
	console.log("req.user", req.user);
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
