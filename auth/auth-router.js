const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secrets = require('../config/secrets');
const Users = require('./auth-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(s => {
      const token = generateToken(s);
      res.status(201).json({ user: s, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(u => {
      if (u && bcrypt.compareSync(password, u.password)) {
        const token = generateToken(u);

        res.status(200).json({
          message: `Welcome user ${u.username}`,
          token,
        });
      } else {
        res.status(401).json({ message: `Wrong login creds...` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = router;
