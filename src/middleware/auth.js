const jwt = require("jsonwebtoken")
const authenticate = function(req, res, next) {
        //  let token = req.headers["x-auth-token"];
        //  if (!token) token = req.headers["x-auth-token"];
        //  if(!token)
        //     return res.send({ status: false, msg: "token must be present" });
        //  else
        //  next()
    try {
    let token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(400).send({ status: false, msg: "token must be present" });
    }
   let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken){
        return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    next()
       
   } catch (error){ res.status(500).send({msg:"Error"}) } 
}

const authorise = function(req, res, next) {
    try{
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-thorium")
    let toBeUpdatedUserId = req.params.userId;
    let loggedInUserId = decodedToken.userId;
    if(loggedInUserId != toBeUpdatedUserId)
    return res.status(400).send({status:false, msg: "You are not authorised to do this task"});
    else
     next()
    }catch(error){res.status(500).send({msg:"Error"})}
 }

 module.exports.authenticate = authenticate
 module.exports.authorise =authorise
    
