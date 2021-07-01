let express = require("express");
const {
  follow,
  unfollow,
  remove,
} = require("../Controller/userActionController");

let router = express.Router();

router.post("/follow", async (req, res) => {
  console.log(req.query);
  let data = await follow(req.query.follower, req.query.following);
  res.status(data.code).json({ status: data.status });
});

router.post("/unfollow", async (req, res) => {
  console.log(req.query);
  let data = await unfollow(req.query.follower, req.query.following);
  res.status(data.code).json({ status: data.status });
});
router.post("/remove", async (req, res) => {
  let data = await remove(req.query.follower, req.query.following);
  res.status(data.code).json({ status: data.status });
});
module.exports = router;
