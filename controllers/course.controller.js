const Course = require('../models/course.model');
const User = require('../models/user.model');

class courseController {
    constructor() { }

    async courseAdd(req, res) {
        try {
            let adminCheck = await User.findOne({ _id: req.user._id, role: 'admin' });
            if (!_.isEmpty(adminCheck)) {
                if (!req.body.name) {
                    res.send({ status: 201, data: {}, message: 'Name cannot be Empty' });
                }
                if (!req.body.description) {
                    res.send({ status: 201, data: {}, message: 'Description cannot be Empty' });
                }
                let courseCheck = await Course.findOne({ name: req.body.name, description: req.body.description });
                if (!_.isEmpty(courseCheck)) {
                    res.send({ status: 201, data: {}, message: 'This Course Already Exists' });
                }
                else {
                    let saveCourse = await Course.create(req.body);
                    if (!_.isEmpty(saveCourse) && saveCourse._id) {
                        res.send({ status: 200, data: saveCourse, message: 'Course Added Successfully' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'Course could not be added' });
                    }
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not Authorized to create course!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    async courseList(req, res) {
        try {
            let adminCheck = await User.findOne({ _id: req.user._id, role: 'admin' });
            if (!_.isEmpty(adminCheck)) {
                let courseList = await Course.find();
                if (!_.isEmpty(courseList)) {
                    res.send({ status: 200, data: courseList, message: 'course list fetched successfully' });
                } else {
                    res.send({ status: 201, data: [], message: 'No Course Found' });
                }
            } 
            else {
                res.send({ status: 201, data: {}, message: 'You are not Admin. Please complete registration!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new courseController(); 