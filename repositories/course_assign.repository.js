const mongoose = require('mongoose');
const CourseAssign = require('../models/course_assign.model');

const CourseAssignRepository = {

    getMemberCourseList: async (req) => {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "member_id": req.user._id });

            conditions['$and'] = and_clauses;

            let courses = await CourseAssign.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'courses',
                        let: { courseId: '$course_id' },
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
                    $project: {
                        _id: "$course_details._id",
                        course_name: "$course_details.name",
                        description: '$course_details.description'
                    }
                }
            ]);
            return courses;
        } catch (e) {
            throw (e);
        }
    },
    
};

module.exports = CourseAssignRepository;