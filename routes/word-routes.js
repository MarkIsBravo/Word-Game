const express = require('express');
const wordRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const wordsController = require('../controllers/words-controller');

wordRoutes.get('/new', authHelpers.loginRequired, wordsController.findOne);

module.exports = wordRoutes;