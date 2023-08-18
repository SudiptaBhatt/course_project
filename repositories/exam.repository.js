const mongoose = require('mongoose');
const Exam = require('../models/submitted_exam.model');

const ExamRepository = {

    getExamResult: async (req) => {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ member_id: new mongoose.Types.ObjectId(req.body.member_id), exam_id: new mongoose.Types.ObjectId(req.body.exam_id) });

            conditions['$and'] = and_clauses;

            let examResult = await Exam.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'examinations',
                        let: { examId: '$exam_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$examId']
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'exam_details'
                    }
                },
                { $unwind: { path: '$exam_details' } },
                {
                    $lookup: {
                        from: 'courses',
                        let: { courseId: '$exam_details.course_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$courseId']
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'course_details'
                    }
                },
                { $unwind: { path: '$course_details' } },
                {
                    $lookup: {
                        from: 'users',
                        let: { memberId: '$member_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$memberId']
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'member_details'
                    }
                },
                { $unwind: { path: '$member_details' } },
                {
                    $addFields: {
                        'isPassed': {
                            $cond: {
                                if: { $gt: ['$marks_obtained', '$exam_details.pass_marks'] }, then: true,
                                else: false
                            }
                        },
                    }
                },
                {
                    $project: {
                        _id: "$_id",
                        course_name: '$course_details.name',
                        exam_name: "$exam_details.name",
                        member_name: '$member_details.name',
                        marks_obtained: '$marks_obtained',
                        isPassed: '$isPassed'
                    }
                }
            ]);
            return examResult[0];
        } catch (e) {
            throw (e);
        }
    },

};

module.exports = ExamRepository;