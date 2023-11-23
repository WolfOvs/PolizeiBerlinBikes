require("dotenv").config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

passport.use(new LocalStrategy(
  function(username, password, done) {
    if(username === 'admin' && bcrypt.compareSync(password, bcrypt.hashSync('admin'))) {
      return done(null, { username: 'admin' });
    } else {
      return done(null, false, { message: 'Incorrect credentials.' });
    }
  }
));


app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      
      return res.json({ user, token });
    });
  })(req, res);
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  app.post('/bikes', authenticateJWT, (req, res) => {
    const { page } = req.body;
  
    axios.get(`https://bikeindex.org:443/api/v3/search?page=${page}&per_page=10&location=Berlin&distance=10&stolenness=proximity`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data from external service');
      });
  });

  app.get('/bikesCount', authenticateJWT, (req, res) => {
  
    axios.get(`https://bikeindex.org:443/api/v3/search/count?location=Berlin&distance=10&stolenness=proximity`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data from external service');
      });
  });

app.listen(3000);
