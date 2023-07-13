const express = require('express');
const router = express.Router();

const {_insertGrades} = require('../controllers/grades.js')

router.post('/api/saveGrades', _insertGrades)

module.exports = {
    router
}