let mongoose = require("mongoose");
let express = require("express");
require("dotenv").config();
let authRouter = require("./Routers/authRouter");
let app = express();
app.use(express.json());
app.use("/auth", authRouter);
(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();

let PORT = 3300;
app.listen(PORT, () => {
  console.log("listening to PORT 3300");
});
