const express = require('express');
const espressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const api = require('./api/weights');
const { passport, authMiddleware } = require('./auth');

const app = express();

app.use(cookieParser());
app.use(espressSession({ secret: 'SECRET' }));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.post('/login', authMiddleware,
  function(req, res) {
    if(req.isAuthenticated()) res.status(200).send('login success');
    else res.status(401).send('unathorized');
  }
);

app.use('/api', api);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/static/index.html');
});

app.use(express.static('static'))
app.listen(3000);
