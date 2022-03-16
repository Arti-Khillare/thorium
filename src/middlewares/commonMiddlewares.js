const jwt = require("jsonwebtoken")

let Authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "token must be present"}) ;
        }
        let decodedToken = jwt.verify(token, "functionup-thoriumBlogger");
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" }) ;
        }
        next()
    }
    catch(err) {
        res.status(500).send({msg:"error found", err}) 
    }
}

const Authorise = function (req, res, next) {
    try{
         let token = req.headers["x-api-key"];
         let decodedToken = jwt.verify(token, "functionup-thoriumBlogger");
         let tobeUpdatedAuthorId = req.params.authorId;
         let loggedInAuthorId = decodedToken.authorId;
         if(loggedInAuthorId != tobeUpdatedAuthorId)
         return res.status(400).send({status: false, msg : "You are not authorise to do this task"});
         else
         next()
    }
    catch(err) {
        res.status(500).send({msg:"error found", err}) 
    }
}

module.exports.Authenticate = Authenticate

module.exports.Authorise = Authorise