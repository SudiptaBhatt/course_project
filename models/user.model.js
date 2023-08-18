const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email cannot be blank'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    gender: {
        type: String, index: true
    },
    phone: {
        type: String, index: true
    },
    password: {
        type: String
    },
    role: {
        type: String, index: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', UserSchema);