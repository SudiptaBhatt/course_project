const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

class userController {
    constructor() { }

    async registration(req, res) {
        try {
            if (!_.has(req.body, 'name')) {
                res.send({ status: 201, data: {}, message: 'Name is required' });
            }
            if (!_.has(req.body, 'email')) {
                res.send({ status: 201, data: {}, message: 'Email is required' });
            }
            if (!_.has(req.body, 'gender')) {
                res.send({ status: 201, data: {}, message: 'Gender is required' });
            }
            if (!_.has(req.body, 'phone')) {
                res.send({ status: 201, data: {}, message: 'Phone Number is required' });
            }
            if (!_.has(req.body, 'password')) {
                res.send({ status: 201, data: {}, message: 'Password is required' });
            }
            let password = req.body.password;
            const userExist = await User.findOne({ email: req.body.email, role: 'admin' });
            if (!_.isEmpty(userExist)) {
                return { status: 201, data: {}, message: 'Admin Already Registered' };
            }
            else {
                req.body.role = 'admin';
                req.body.password = bcrypt.hashSync(password, 10);
                let saveUser = await User.create(req.body);
                if (!_.isEmpty(saveUser)) {
                    let token = jsonwebtoken.sign({ email: saveUser.email, id: saveUser._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                    res.send({ status: 200, token: token, data: saveUser, msg: 'Admin Registration Successful' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Admin Registration Unsuccessful' });
                }
            }
        } catch (err) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    };

    async login(req, res) {
        try {
            if (!_.has(req.body, 'email')) {
                res.send({ status: 201, data: {}, message: 'Email is required' });
            }
            if (!_.has(req.body, 'password')) {
                res.send({ status: 201, data: {}, message: 'Password is required' });
            }
            let password = req.body.password;
            let userDetails = await User.findOne({ email: req.body.email });

            if (!_.isEmpty(userDetails)) {
                if (userDetails.role === "admin") {
                    let isPasswordMatched = await bcrypt.compareSync(password, userDetails.password);
                    if (!isPasswordMatched) {
                        res.send({ status: 201, data: {}, message: 'Password not matched' });
                    }
                    else {
                        let token = jsonwebtoken.sign({ email: userDetails.email, id: userDetails._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, data: userDetails, token: token, message: 'Logged in successfully!' });
                    }
                }
                else if (userDetails.role === "member") {
                    let isPasswordMatched = await bcrypt.compareSync(password, userDetails.password);
                    if (!isPasswordMatched) {
                        res.send({ status: 201, data: {}, message: 'Password not matched' });
                    }
                    else {
                        let token = jsonwebtoken.sign({ email: userDetails.email, id: userDetails._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, data: userDetails, token: token, message: 'Logged in successfully!' });
                    }
                }
            }
            else {
                res.send({ status: 201, data: {}, isLoggedIn: false, message: 'User not Registered!' });
            }
        } catch (err) {
            console.log(err.message)
            return { status: 500, message: err.message };
        }
    };

    async memberAdd(req, res) {
        try {
            let adminCheck = await User.findOne({ _id: req.user._id });
            if (adminCheck.role === 'admin') {
                let memberCheck = await User.findOne({ email: req.body.email });
                if (!_.isEmpty(memberCheck)) {
                    res.send({ status: 201, data: {}, message: 'Member Already Exists' });
                }
                else {
                    req.body.role = 'member';
                    let password = req.body.password;
                    req.body.password = bcrypt.hashSync(password, 10);
                    let createMember = await User.create(req.body);
                    if (!_.isEmpty(createMember)) {
                        res.send({ status: 200, data: createMember, message: 'Member Created Successfully' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'Member could not be created' });
                    }
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not Authorized to create member!' });
            }
        } catch (err) {
            return res.send(500).send({ message: err.message });
        }
    };
}

module.exports = new userController();