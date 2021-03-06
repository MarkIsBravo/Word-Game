const express = require('express');
const usersWordRoutes = express.Router();
const usersWordsController = require('../controllers/userswords-controller');
const authHelpers = require('../services/auth/auth-helpers');

usersWordRoutes.get('/', authHelpers.loginRequired,usersWordsController.findUsersWords);

usersWordRoutes.delete('/:id', authHelpers.loginRequired, usersWordsController.delete);

usersWordRoutes.post('/new', authHelpers.loginRequired, usersWordsController.addToUser);

module.exports = usersWordRoutes;