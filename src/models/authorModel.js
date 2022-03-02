const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_id : {
        type:Number,
        required:true
    },
    author_name: String,
    address: String,
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    age: Number,
    
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema) //users


