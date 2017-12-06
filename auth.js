const passport = require('passport');
const CustomStrategy = require('passport-custom')
const GoogleAuth = require('google-auth-library');

const auth = new GoogleAuth;
const clientId = process.env.CLIENT_ID;
const client = new auth.OAuth2(clientId);

passport.use(new CustomStrategy(
  function(req, done) {
    client.verifyIdToken(
        req.body.token,
        clientId,
        function(e, login) {
            if(e) {
                console.warn(e);
                return done(null, false);
            }

            const payload = login.getPayload();
            const userId = payload['sub'];

            done(null, {'id': userId});
        }
    )}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const authMiddleware = passport.authenticate('custom');

module.exports = { passport, authMiddleware }
