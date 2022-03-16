const AuthorModel= require("../models/authorModel")
const jwt = require("jsonwebtoken")

const createAuthor= async function (req, res) {
    try{
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.status(200).send({msg: savedData})
    }
    catch(err){
        res.status(500).send({msg:"error found", err})
    }
}

const loginAuthor = async function (req, res){
    try{
     let authorName = req.body.email;
     let passWord = req.body.password;
     //validation a
     let Author = await AuthorModel.findOne({ email: authorName, password: passWord });
     //validation b
     if(!Author)
     return res.status(400).send({status: false,msg: "username or the password is not corerct",});

    let token = jwt.sign(
    {
        authorId: Author._id.toString(),
        batch: "thoriumProject",
        organisation: "FUnctionUpProj1",
      },
      "functionup-thoriumBlogger"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
    }
    catch(err)
    {
        res.status(500).send({msg:"error found", err}) 
    }
}

module.exports.createAuthor= createAuthor

module.exports.loginAuthor= loginAuthor

