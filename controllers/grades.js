const {
    insertGrade,
    } = require ('../modules/grades.js');

const _insertGrade = (req, res) => {
    insertGrade(req.body) // json with name and price
    .then(data => {
        // res.json(data)
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({msg:err.message})
    })
}

module.exports = {
    _insertGrade,
}
