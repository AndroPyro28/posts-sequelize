const jwt = require("jsonwebtoken");

const { Users } = require("../models")
module.exports.verify = async (req, res, next) => {
    const { usertoken } = req.headers;
    try {
        //if usertoken failed to verify it will catch and return a response
        const userJwt = jwt.verify(usertoken, "sqlTutorial");

        req.currentUser = await Users.findByPk(userJwt.id, {
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"] // in attributes you can exclude some data in table
            }// it will return only username, email and id
        })
        console.log(req.currentUser)
        next();

    } catch (error) {
        return res.status(200).json({
            success: false,
            msg: "session expired"
        })
    }
}