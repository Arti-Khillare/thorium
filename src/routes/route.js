const express = require('express');
const router = express.Router();
//to present movielist
router.get("/movie-list", function(req,res)
{
    res.send(["Suryavanshi", "Welcome", "Happy New Year", "Happy Ending", "Pardes"])
})
//get movies in object form
router.get('/movies', function(req,res){
    let movie = req.body;
    console.log(movie)
    res.send(movie)
})
//get movie index
router.get('/movies/:moviesid', function(req,res)
{
    let moviesid = 1
    let movie =req.body
    let validrequest = req.params.moviesid
    for(let i=0;i<movie.length;i++)
    {
        if(movie[i].id>validrequest)
        {
            res.send("id:'1',name:'The shining'",movie)
        }
        else
        {
            res.send("provide valid userid")
        }
    }
    res.send(movie)
})
router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})




module.exports = router;
