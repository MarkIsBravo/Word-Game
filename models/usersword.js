const db = require('../db/config');

const UsersWord = {};

UsersWord.findUsersWords = userid => {
    return db.manyOrNone(`
    SELECT * FROM users_words
    WHERE user_id = $1
    `, [userid]);
};

UsersWord.addToUser = (word, userid) => {
    return db.one(`
    INSERT INTO users_words
    (spell, user_id)
    VALUES ($1, $2)
    RETURNING *
    `, [word.spell, userid]);
};

UsersWord.destroy = (id) => {
    return db.none(`
    DELETE FROM users_words
    WHERE id = $1
    `, [id]);
};

module.exports = UsersWord;