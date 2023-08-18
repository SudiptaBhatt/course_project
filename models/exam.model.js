const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExaminationSchema = new mongoose.Schema({
    name: { type: String, index: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', index: true },
    total_marks: { type: Number },
    pass_marks: { type: Number },
    exam_time: { type: Number },
    question_answer_set: [{
        question: { type: String, index: true },
        marks: { type: Number },
        answer: [{
            option: { type: String, index: true },
            isCorrectAnswer: { type: Boolean, default: false, enum: [true, false] }
        }]
    }]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Examination', ExaminationSchema);