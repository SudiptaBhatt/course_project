const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, index: true },
    description: { type: String, index: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Course', CourseSchema);