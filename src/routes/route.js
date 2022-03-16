const express = require('express');
const router = express.Router();
const AuthorContorller = require("../controllers/authorController")
const BlogController = require("../controllers/blogController");
const  Authenticate  = require("../middlewares/commonMiddlewares");


router.post("/createAuthor", AuthorContorller.createAuthor)

router.post("/loginAuthor", AuthorContorller.loginAuthor)

router.post("/createBlog" , Authenticate.Authenticate,  BlogController.createBlog)

router.get("/getBlog" , Authenticate.Authenticate,   BlogController.getBlog)

router.put("/UpdateBlog/:authorId/:blogId" ,Authenticate.Authenticate,Authenticate.Authorise, BlogController.UpdateBlog)

router.delete("/deletedBlogById/:authorId/:blogId",Authenticate.Authenticate,Authenticate.Authorise,BlogController.deletedBlogById)

router.delete("/deleteBlogs/:authorId/:blogId",Authenticate.Authenticate, Authenticate.Authorise, BlogController.deletedBlogsByParams)

module.exports = router;