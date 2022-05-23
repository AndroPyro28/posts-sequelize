const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
module.exports.signup = async (req, res) => {
    let userInfo = req.body;
    if (!userInfo.username || !userInfo.password || !userInfo.email) {
        return res.status(200).json({
            "msg": "Fill upp all information to signup",
            "success": false
        })
    }

    const user = await Users.findOne({
        where: {
            email: userInfo.email
        }
    });

    if (user) {
        return res.status(200).json({
            "msg": "This email is already exist",
            "success": false
        })
    }

    userInfo.password = await bcrypt.hash(userInfo.password, 6);

    const resDB = await Users.create(userInfo);

    return res.status(200).json(resDB);
}

const maxAge = 24 * 60 * 60;

const assignToken = (id) => {
    return jwt.sign({ id }, "sqlTutorial", {
        expiresIn: maxAge
    })
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({
            "success": false,
            "msg": "please fill up the textboxes"
        })
    }

    const user = await Users.findOne({
        where: {
            email
        }
    })

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            "success": false,
            "msg": "Invalid credentials"
        })
    }
    const jwtToken = assignToken(user.id);
    
    return res.status(200).json({
        "msg": "you are logged in",
        "success": true,
        "jwtToken": jwtToken
    })
}