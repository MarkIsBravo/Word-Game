const Word = require('../models/word');

const wordsController = {};

wordsController.findOne = (req, res) => {
    Word.findOne()
    .then(words => {
        res.json(words);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports = wordsController;