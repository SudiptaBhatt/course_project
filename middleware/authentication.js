require('dotenv').config();
const jwtToken = require('../services/jwt');
const UserModel = require('../models/user.model');

const checkAuth = {
    Authenticate: async function (req, res, next) {
        const tokens = req.headers.token || req.query.token;
        if (tokens) {
            const checktoken = await jwtToken.verify(tokens, res);
            let checkUser = await UserModel.findOne({ _id: checktoken.id });
            if (checkUser != null) {
                req.user = checkUser;
                next();
            } else {
                res.status(401).json({ 'status': 401, "message": "Unauthorized HTTP Request" })
            }
        } else {
            res.status(401).json({ 'status': 401, "message": "Unauthorized HTTP Request" })
        }
    }
}

module.exports = checkAuth;