const User = require('../modules/User')
const authenticateUser = require('../modules/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require("../config/config");

const generateAccessToken = (
    id,
    roles,
    // specialist_id,
    // group_id
    ) => {
    const payload = {
        id,
        roles,
        // specialist_id,
        // group_id
    }
    return jwt.sign(payload, secret, {expiresIn: "6h"}) // func sign
}

// const hashPassword = bcrypt.hashSync(password, 7);
// const userRole = await Role.findOne({value: "USER"})

class authController {
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} undefine`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()