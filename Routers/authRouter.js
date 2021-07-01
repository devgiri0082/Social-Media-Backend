const {
  signUp,
  login,
  addRefresh,
  signOut,
} = require("../Controller/userAuthController");
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
      userName: response.status.userName,
    };
    let authSign = jwt.sign(userDetails, process.env.AUTHORIZATION_SECRET, {
      expiresIn: process.env.AUTHORIZATION_TIME,
    });
    let refreshSign = jwt.sign(userDetails, process.env.REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TIME,
    });
    let addingRefresh = await addRefresh(refreshSign, response.status.userName);
    if (addingRefresh.code !== 200)
      res.status(addingRefresh.code).json({ status: response.status });
    res
      .status(addingRefresh.code)
      .json({ authorizationToken: authSign, refreshToken: refreshSign });
  } else res.status(response.code).json({ status: response.status });
});

router.post("/logout", async (req, res) => {
  let response = await signOut(req.body);
  res.status(response.code).json({ status: response.status });
});

module.exports = router;
