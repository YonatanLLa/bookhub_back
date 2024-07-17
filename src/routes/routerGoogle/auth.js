require("dotenv").config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../../db');
const { avisoLogin } = require("../../email/email");
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET}= process.env

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://bookhubback.vercel.app/auth/google/callback", // Agrega 'http:' antes de '//localhost'
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  User.findOne({
    where: { email: profile.email}
  }).then(async (user) => {
    if (!user) {
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.email,
        image: profile.picture
      });
      await avisoLogin(profile.email)// le llega el email
      done(null, newUser);
    } else {
      done(null, user);
    }
  }).catch((err) => {
    console.log("error-", err)
    done(err, null);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(id, done) {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err, null);
  });
});
