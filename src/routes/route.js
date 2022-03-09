const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authenticate= require("../middleware/auth")
const authorise= require("../middleware/auth")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)
router.get("/users/:userId",authenticate.authenticate, userController.getUserData)
//router.get("/users/:userId",authorise.authorise, userController.getUserData)
router.post("/users/:userId/posts",authorise.authorise, userController.postMessage)
router.put("/users/:userId",authorise.authorise, userController.updateUser)


module.exports = router;