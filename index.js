var express = require('express');

var api = require('./api');
var espressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, {id: profile.id, name: profile.displayName, email: profile.emails[0].value});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

app.use(cookieParser());
app.use(espressSession({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('static'))
app.use('/api', api);


app.get('/isAuthenticated', function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user);
  }
  res.send({isAuthenticated: req.isAuthenticated()});

});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email profile'] }));


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(3000);
