const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');
const e = require('express');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // console.log(req)

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'mysecret', async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        if (user) {
          req.session.userId = decodedToken.id
          req.session.isAdmin = user.isAdmin
          req.session.username = user.username
        }
        console.log(req.session)
        next();
      }
    });
  } else {
    const err = new Error('not Logged in')
    err.customprop = 'kyu bhai kya kar raha hai'
    next(err);
  }
};

const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    if (req.session.isAdmin) {
      next()
    }else {
      const err = new Error('not a admin')
      next(err);
    }
  } else {
    const err = new Error('not logged in')
    err.customprop = 'kyu bhai kya kar raha hai'
    next(err);
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'mysecret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, requireAdmin };