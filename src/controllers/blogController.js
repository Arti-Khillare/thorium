const { count } = require("console")
const { send } = require("process")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken")

const createBlog = async function (req, res) {
   try{
           let data = req.body
           let authorId = data.authorId

    //validation a
    if(!authorId) return  res.status(401).send("The request is not valid and authorID is required")

    //validation b
    let authorReq=await authorModel.findById(authorId)
    if(authorReq){
        let createBlog = await blogModel.create(data)
        res.status(201).send({status: true, data: createBlog})
    }
    else{
        res.status(400).send({status: false, msg:`${authorId} is not Available, Enter valid authorId`})
    }
}
catch(err){
    console.log("ERRORR", err.message)
    res.status(500).send({msg: "errror found", error:err.message})
}
}

   const getBlog = async function (req, res) {
    try {
        let filters = req.query
        filters.isDeleted  = false
        filters.isPublished = false
        console.log(filters)

        let allBlogs = await blogModel.find(filters)
        if(allBlogs.length == 0) {
            return res.status(404).send({status: false, msg: ""})
        }
        return  res.status(200).send({status: true, msg: allBlogs})
    }
    catch(err){
        console.log("ERROR", err.message)
        res.status(500).send({msg: "error found" ,error:err.message})
    }
}

const UpdateBlog = async function(req, res) {
    try{
    let Id = req.params.blogId
    let data = req.body
    data.publishedAt = Date.now()
    data.isPublished = true
    
    let updatedBlog = await blogModel.findByIdAndUpdate( 
        {_id:Id}, {$set : data},{new : true})
    return res.status(200).send(updatedBlog)
    }catch(err){
        console.log("ERROR", err.message)
        res.status(500).send({msg: "error found" ,error:err.message})
    }
}

const deletedBlogById = async function(req, res) {
    try{
        let Id = req.params.blogId
        let isexistdeletedBlog= await blogModel.findById(Id)
        if(!isexistdeletedBlog)
        return res.status(400).send({Status: false, msg : "BlogId is not exist and its data not found"})
        if(isexistdeletedBlog.isDeleted != true){
            let deletedblog = await blogModel.findOneAndUpdate({_id:Id}, {$set:{isDeleted:true}})
            console.log(deletedblog)
            return res.status(200).send( deletedblog )
        }
        else{
            return res.status(400).send({status: false, msg: "Already Deleted Blog"})
        }
    }
    catch(err){
        console.log("ERROR", err.message)
        res.status(500).send({msg: "error found" ,error:err.message})
    }
}

const deletedBlogsByParams = async function(req, res) {
    try{
         let filters = req.query

         let token = req.headers["x-api-key"]
         if(!token) return res.status(400).send({status: false, msg: "token must be present in the header"})
         let decodedToken = jwt.verify(token, "functionup-thoriumBlogger")
         if(!decodedToken) return res.status(400).send({status: false, msg:"token is not valid"})
         //let blogTobedeleted = req.params.authorId
         let authorLoggedIn = decodedToken.authorId
         if(!filters.authorLoggedIn) {
             filters.authorId = authorLoggedIn
         }
         if(authorLoggedIn != filters.authorId){
             return res.status(401).send({ status: false, msg : "Unauthorized Access"})
         }
        // if(blogTobedeleted != authorLoggedIn)
        //return res.status(400).send({status: false , msg:"Loggedin Author  is not allowed to delete the requested blog authours data"})

         let ifExists = await blogModel.find(filters)
         if(!ifExists) {
             return res.status(404).send({Status: false, msg :"Data not found"})
         }
         if(ifExists.isDeleted != true){
             let deleteBlog = await blogModel.findOneAndUpdate(filters, {$set: {isDeleted:true}})
             console.log("deleted")
             return res.status(200).send({status: true, msg : "Succesfully Deleted"})
         }
         else{
             return res.status(400).send({status: false, msg: "already deleted"})
        }
    }
    catch(err){
        console.log("ERROR", err.message)
        res.status(500).send({msg: "error found" ,error:err.message})
    }
}

module.exports.createBlog = createBlog

module.exports.getBlog = getBlog

module.exports.UpdateBlog = UpdateBlog

module.exports.deletedBlogById = deletedBlogById

module.exports.deletedBlogsByParams = deletedBlogsByParams





