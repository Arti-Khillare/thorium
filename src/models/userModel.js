const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: {
        type:String,
        required:true,
    },
    emailId: String,
    password: String,
    gender: String,
    isDeleted: Boolean,
    age: Number,
    posts: {
        type: [],
        defult: []
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
