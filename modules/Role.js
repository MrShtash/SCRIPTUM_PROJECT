// const {Schema, model} = require('pg');
// const pg = require('pg');
// const {db} = require('../config/db.js');

// const authenticateUser = (specialist) => {
//     return db('specialist')
//     value: {type: String, unique: true, default: 'USER'}
//     .returning('*')
    
// }

// module.exports = {
//     authenticateUser
// }
const {db} = require('../config/db.js');


const authenticateUser = async (username, password) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);

    if (!user) {
      return null;
    }

    if (user.password === password) {
      const {password, ...userData} = user;
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('ERROR authenticated:', error);
    throw error;
  }
};

module.exports = {
  authenticateUser
};
