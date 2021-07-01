const { signUp, login } = require("../Controller/userController");
let jwt = require("jsonwebtoken");
let express = require("express");
let router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let response = await signUp(req.body);
  res.status(response.code).json({ status: response.status });
});
router.post("/login", async (req, res) => {
  let response = await login(req.body);
  if (response.code === 200) {
    let userDetails = {
      userName: response.userName,
      exp: process.env.AUTHORIZATION_TIME,
    };
    jwt.sign(userDetails);
  }
  res.status(response.code).json({ status: response.status });
});

module.exports = router;
