const db = require('../db/config');
const User = {};
//find user
User.findByUserName = username => {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `,[username]);
};
//create new users 
User.create = user => {
    return db.one(`
    INSERT INTO users
    (username, password_digest, nickname, email, currency)
    VALUES ($1, $2, $3, $4, 100)
    RETURNING *
    `,[user.username, user.password_digest, user.nickname, user.email]);
};
//edit users info
User.update = (nickname, email, id) => {
    return db.one(`
    UPDATE users SET
    nickname = $1,
    email = $2
    WHERE id = $3
    RETURNING *
    `, [nickname, email, id]);
};
//delete users
User.destroy = (id, user_id) => {
    return db.none(`
    DELETE FROM users_words where user_id = $1;
    DELETE FROM users_characters where user_id = $1;
    DELETE FROM users_inventory where user_id = $1;
    DELETE FROM users where id = $1
    `, [id]);
};

//update currency
User.updateCurrency = (user) => {
    return db.one(`
    UPDATE users SET
    currency = $1
    WHERE id = $2
    RETURNING *
    `, [user.currency, user.id])
}

module.exports = User;