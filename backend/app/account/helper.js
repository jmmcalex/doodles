const SHA256 = require('crypto-js/sha256');
const { SECRET_SALT } = require('../../secrets');

const hash = string => {
    return SHA256(`${SECRET_SALT}${string}${SECRET_SALT}`).toString();
}

module.exports = { hash };