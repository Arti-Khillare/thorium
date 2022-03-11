let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getByDistrictId = async function (req, res) {
    try{
        let districtid = req.query.district_id
        let date = req.query.date
        console.log(`query params are: ${districtid} ${date}`)
        
        var options = {
            method : "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtid}&date=${date}`,
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getWeather = async function (req, res) {
    try{
        let tempOfLondon = req.query.q
        let id = req.query.appid
        console.log(`query params are: ${tempOfLondon} ${id}`)

        var options = {
            method : "get",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${tempOfLondon}&appid=${id}`,
        }
        let result = await axios(options)
        res.status(200).send({msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getCitiesSortedByTemp = async function (req, res){
    try{
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let newSortedCities = []
        for(let i=0;i<cities.length;i++){
            let city1 = {city: cities[i]}
        
        var options = {
            method : "get",
            url : `https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=bbece151db69c9097279bc35cebae6dc`,
        }
        let result = await axios(options)
        console.log(result.data.main.temp)
        city1.temp= result.data.main.temp
        newSortedCities.push(city1)
    }
        let sorted = newSortedCities.sort( function(a, b){return a.temp - b.temp})
        console.log(sorted)
        res.status(200).send({status: true, data:sorted})

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let createMeme = async function (req, res){
    try{
        let tempid = req.query.template_id
        let t0 = req.query.text0
        let t1 = req.query.text1
        console.log(`query params are: ${tempid} ${t0} ${t1}` )
        var options = {
             method : "get",
             url : `https://api.imgflip.com/caption_image?template_id=${tempid}&text0=${t0}&text1=${t1}&username=chewie12345&password=meme@123`,
        }
        let result = await axios(options)
        res.status(200).send({data: result.data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getByDistrictId = getByDistrictId
module.exports.getWeather = getWeather
module.exports.getCitiesSortedByTemp = getCitiesSortedByTemp
module.exports.createMeme = createMeme
module.exports.getOtp = getOtp