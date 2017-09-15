const UsersWord = require('../models/usersword');
const usersWordsController = {};

usersWordsController.findUsersWords = (req, res) => {
    UsersWord.findUsersWords(req.user.id)
    .then(userswords => {
        res.json(userswords);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports = usersWordsController;