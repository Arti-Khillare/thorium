const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [String],
    authorName: {
        type: String,
        required: true,
        unique: true
    },
    totalPages: Number,
    stockAvailable: Boolean,
    default: false,
    sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

