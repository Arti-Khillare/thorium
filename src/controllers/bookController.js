const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")
const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher
    
    //validation a
    if(!authorId) return res.send('The request is not valid as author details are required.')

    //validation b
    let author = await authorModel.findById(authorId)
    if(!author) return res.send('The request is not valid as no author is present with given author id.')

    //validation c
    if(!publisherId) return res.send('The request is not valid as the publisher details are required.')

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('The request is not valid as no  publisher is present with given publisherId.')

    let bookCreated = await bookModel.create(book)
    return res.send({data: bookCreated})
}

const putBooks= async function (req,res)  {
      let pbooks = await bookModel.updateMany(
        //{publisher:{$in:["Penguin", "HarperCollins"]}}.find({_id:1}).populate("author_id, publisher_id"),
        {publisher:"62210348bbce397df2c75d61",publisher:"61951bfa4d9fe0d34da84523"},
        {$set:{isHardCover:true}},
        {new:true},
    )
        res.send({data:pbooks})
}
const updateBooks = async function(req, res) {
    let ubooks = await bookModel.updateMany(
       { authorrating:{$gt:3.5}},
       {$set:{price:100}},
       {new:true},
    )
    res.send({data:ubooks})
}
const getBooks= async function (req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}

module.exports.createBook= createBook
module.exports.putBooks=putBooks
module.exports.updateBooks= updateBooks
module.exports.getBooks= getBooks
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
