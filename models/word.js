const db = require('../db/config');

const Word = {};

Word.findOne = () => {
    return db.query(`
    SELECT * FROM words
    ORDER BY RANDOM()
    LIMIT 1
    `);
};

module.exports = Word;