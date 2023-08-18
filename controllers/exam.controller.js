const Exam = require('../models/exam.model');
const User = require('../models/user.model');

class examController {
    constructor() { }

    async examAdd(req, res) {
        try {
            let adminCheck = await User.findOne({ _id: req.user._id, role: 'admin' });
            if (!_.isEmpty(adminCheck)) {
                if (!req.body.name) {
                    res.send({ status: 201, data: {}, message: 'Name is required' });
                }
                if (!req.body.course_id) {
                    res.send({ status: 201, data: {}, message: 'Course Id is required' });
                }
                if (!req.body.total_marks) {
                    res.send({ status: 201, data: {}, message: 'Total Marks is required' });
                }
                if (!req.body.pass_marks) {
                    res.send({ status: 201, data: {}, message: 'Pass Marks is required' });
                }
                if (!req.body.exam_time) {
                    res.send({ status: 201, data: {}, message: 'Examination Time is required' });
                }
                let examCheck = await Exam.findOne({ name: req.body.name, course_id: req.body.course_id });
                if (!_.isEmpty(examCheck)) {
                    res.send({ status: 201, data: {}, message: 'This Exam already exists for this course' });
                }
                else {
                    let saveExam = await Exam.create(req.body);
                    if (!_.isEmpty(saveExam) && saveExam._id) {
                        res.send({ status: 200, data: saveExam, message: 'Exam Added Successfully' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'Exam could not be added' });
                    }
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not Authorized to add examination!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    async examList(req, res) {
        try {
            let examList = await Exam.find({ course_id: req.body.course_id });
            if (!_.isEmpty(examList)) {
                res.send({ status: 200, data: examList, message: 'Exam list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'No Exam Found' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new examController();