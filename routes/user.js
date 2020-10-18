/* eslint-disable linebreak-style */
const express = require('express');
const {
  logout,
  postLogin, postSignup, getLoggedIn
} = require('../controllers/user');
const { isAuthenticated } = require('../config/passport');

const router = express.Router();

router.post('/login', postLogin);

router.post('/signup', postSignup);

router.get('/loggedin', isAuthenticated, getLoggedIn);

router.get('/logout', isAuthenticated, logout);

exports.default = router;
