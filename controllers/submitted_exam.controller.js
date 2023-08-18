const submittedExams = require('../models/submitted_exam.model');
const User = require('../models/user.model');
const examRepo = require('../repositories/exam.repository');

class SubmittedExamsController {
    constructor() { }

    async memberExamSubmit(req, res) {
        try {
            let memberCheck = await User.findOne({ _id: req.user._id, role: 'member' });
            //console.log('member',memberCheck);
            if (!_.isEmpty(memberCheck)) {
                req.body.member_id = req.user._id;
                let examSubmit = await submittedExams.create(req.body);
                if (!_.isEmpty(examSubmit)) {
                    res.send({ status: 200, data: examSubmit, message: 'Member submitted exam successfully' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Exam could not be submitted!' });
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not a member. You can not attempt this exam!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    async examResult(req, res) {
        try {
            let userDetails = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(userDetails)) {
                const examResultDetails = await examRepo.getExamResult(req);
                if (!_.isEmpty(examResultDetails)) {
                    res.send({ status: 200, data: examResultDetails, message: 'Exam result details for this member fetched successfully' });
                } else {
                    res.send({ status: 201, data: {}, message: 'member has not submitted this exam!' });
                }
            } else {
                res.send({ status: 201, data: {}, message: 'You are not a valid user!' });
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
}

module.exports = new SubmittedExamsController();