const CourseAssign = require('../models/course_assign.model');
const courseAssignRepo = require('../repositories/course_assign.repository');
const User = require('../models/user.model');

class courseAssignController {
    constructor() { }

    async memberCourseAssign(req, res) {
        try {
            let adminCheck = await User.findOne({ _id: req.user._id });
            if (adminCheck.role === 'admin') {
                if (!_.has(req.body, 'member_id')) {
                    res.send({ status: 201, data: {}, message: 'Member Id is required' });
                }
                if (!_.has(req.body, 'course_id')) {
                    res.send({ status: 201, data: {}, message: 'Course Id is required' });
                }
                let memberAssignCheck = await CourseAssign.findOne({ course_id: req.body.course_id, member_id: req.body.member_id });
                if (!_.isEmpty(memberAssignCheck)) {
                    res.send({ status: 201, data: {}, message: 'Member already assigned this course' });
                }
                else {
                    let memberAssign = await CourseAssign.create(req.body);
                    if (!_.isEmpty(memberAssign) && memberAssign._id) {
                        res.send({ status: 200, data: memberAssign, message: 'Course assigned to member successfully' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'Course could not be assigned to member' });
                    }
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not authorized to assign course to member!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    async memberCourseList(req, res) {
        try {
            let memberDetails = await User.findOne({ _id: req.user._id, role: 'member' });
            if (!_.isEmpty(memberDetails)) {
                const memberCourses = await courseAssignRepo.getMemberCourseList(req);
                if (!_.isEmpty(memberCourses)) {
                    res.send({ status: 200, data: memberCourses, message: 'Member assigned course list fetched successfully' });
                }
                else {
                    res.send({ status: 201, data: [], message: 'Member has no assigned courses' });
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'You are not a member!' });
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new courseAssignController(); 