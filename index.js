var express = require('express');

var api = require('./api');
var espressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');
var CustomStrategy = require('passport-custom')

var GoogleAuth = require('google-auth-library');

var auth = new GoogleAuth;

var clientId = process.env.CLIENT_ID;

var client = new auth.OAuth2(clientId);

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

            var payload = login.getPayload();
            var userId = payload['sub'];
            console.log(userId);

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

var app = express();

app.use(cookieParser());
app.use(espressSession({ secret: 'SECRET' }));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


app.post('/login',
  passport.authenticate('custom'),
    function(req, res) {
      if(req.isAuthenticated()) res.status(200).send('login success');
      else res.status(401).send('unathorized');
    }
);

app.use('/api', api);

app.get('/',function(req,res){
  if (!req.isAuthenticated()) {
    res.send(401).send('unauthorized');
  } else {
    res.sendFile(__dirname + '/static/index.html');
  }
});

app.use(express.static('static'))
app.listen(3000);
