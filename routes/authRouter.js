// define routes for sending require
const {Router} = require('express'); // import Router
const router = new Router(); // create router obj, can listen require (get, post, deletee, etc.)
const controller = require('../controllers/authController');
// const {check} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/api/login', controller.login);
router.get('/api/users',
            authMiddleware,
            controller.getUsers);
// router.get('/api/users', roleMiddleware(['ADMIN']), controller.getUsers);


module.exports = {
    router
}