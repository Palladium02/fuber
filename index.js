const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const randomString = require('randomstring');
const { DB } = require('./src/db/database');

const app = express();
const port = 80;
const db = new DB('./.db/db.json');

const ISLOGGEDINCOOKIENAME = 'OynJTrCiaI';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

let sessions = {};

app.get('/', (req, res) => {
  // differentiate between logged in and logged out users
  if (req.cookies[ISLOGGEDINCOOKIENAME]) {
    res.sendFile('/html/index.html', { root: __dirname });
  } else {
    res.sendFile('/html/login.html', { root: __dirname });
  }
});

app.get('/app', (req, res) => {
  // differentiate between logged in and logged out users
  if (req.cookies[ISLOGGEDINCOOKIENAME]) {
    res.sendFile('/html/index.html', { root: __dirname });
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  let sessionID = req.cookies['SESSION'];
  delete sessions[sessionID];

  res.clearCookie(ISLOGGEDINCOOKIENAME);
  res.clearCookie('SESSION');
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  db.setCurrentTable('users');
  let username = req.body.username;
  let password = req.body.password;
  let uuid = randomString.generate(8);

  sessions[uuid] = {
    user: username,
  };

  let matchedUser = db.performQuery(username);
  if (matchedUser && matchedUser.password === password) {
    res
      .cookie(ISLOGGEDINCOOKIENAME, 'uber-clone', {
        expires: new Date(Date.now() + 1 * 3600000),
      })
      .cookie('SESSION', uuid, { expires: new Date(Date.now() + 1 * 3600000) })
      .redirect('/app');
  } else {
    res.redirect('/#err');
  }
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
