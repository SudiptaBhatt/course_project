const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmittedExamSchema = new mongoose.Schema({
    exam_id: { type: Schema.Types.ObjectId, ref: 'Examination', index: true },
    member_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    marks_obtained: { type: Number },
    question_answers: [{
        question_id: { type: Schema.Types.ObjectId, ref: 'Examination', index: true },
        marks: { type: Number },
        answer: { type: String, index: true }
    }]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('submitted_exam', SubmittedExamSchema);