const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseAssignSchema = new mongoose.Schema({
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', index: true },
    member_id: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Course_Assign', CourseAssignSchema);