const route = require("../routes/route")
const middleware = function(req,res, next){
    let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    let IP = req.socket.remoteAddress
    console.log(datetime, ",", IP, ",",  )

    next()
}
module.exports.middleware = middleware