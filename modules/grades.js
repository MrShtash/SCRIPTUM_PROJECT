const {db} = require('../config/db.js');

const insertGrade = (grades) => {
    return db('grades')
    .insert(grades) // obj {}
    .returning('*')
}

module.exports = {
    insertGrade,
}