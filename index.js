let mongoose = require("mongoose");
let express = require("express");
require("dotenv").config();
let authRouter = require("./Routers/authRouter");
let actionRouter = require("./Routers/actionRouter");
let jwt = require("jsonwebtoken");
let app = express();
app.use(express.json());
(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();
//Middleware
app.use("/auth", authRouter);
app.use("/action", validateRequest, actionRouter);
function validateRequest(req, res, next) {
  if (!req.headers.authorization) {
    res.status(400).json({ message: "authorization not provided" });
    return;
  }
  let authorizationSecret = req.headers.authorization.split(" ")[1];
  if (!authorizationSecret) {
    res.status(400).json({ message: "authorization not provided" });
    return;
  }
  try {
    let decoded = jwt.verify(
      authorizationSecret,
      process.env.AUTHORIZATION_SECRET
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid authorization" });
    return;
  }
  next();
}
let PORT = 3300;
app.listen(PORT, () => {
  console.log("listening to PORT 3300");
});
