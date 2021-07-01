const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

let signUp = async ({ userName, email, password }) => {
  try {
    if (!validEmail(email)) return { code: 400, status: "Email is not valid" };
    let userNameExist = await userModel.findOne({ userName: userName });
    if (userNameExist) return { code: 400, status: "User name already exist" };
    let emailExist = await userModel.findOne({ email: email });
    if (emailExist) return { code: 400, status: "Email already exist" };
    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new userModel({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return { code: 200, status: "New user is created" };
  } catch (err) {
    console.log(err);
    return { code: 500, status: err };
  }
};

let login = async ({ userName, password }) => {
  try {
    let givenUser = await userModel.findOne({ userName: userName });
    if (!givenUser) return { code: 400, status: "given user does not exist" };
    let match = await bcrypt.compare(password, givenUser.password);
    if (match) return { code: 200, status: givenUser };
    return { code: 400, status: "given password is not valid" };
  } catch (err) {
    console.log(err);
    return { code: 500, status: err };
  }
};
let signOut = async ({ userName }) => {
  try {
    let givenUser = await userModel.findOne({ userName: userName });
    if (!givenUser) return { code: 400, status: "given user does not exist" };
    await userModel.updateOne(
      { userName: userName },
      {
        $set: { refreshToken: "" },
      }
    );
    return { code: 200, status: "logout successful" };
  } catch (err) {
    console.log(err);
    return { code: 500, status: err };
  }
};

let addRefresh = async (refresh, userName) => {
  try {
    console.log("updating Started");
    let data = await userModel.updateOne(
      { userName: userName },
      {
        $set: { refreshToken: refresh },
      }
    );
    console.log("update finished", refresh, userName);
    return { code: 200, status: "Refresh token is added" };
  } catch (err) {
    console.log(err);
    return { code: 501, status: err };
  }
};

const validEmail = (str) =>
  !/(\.{2}|-{2}|_{2})/.test(str) &&
  /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    str
  );
module.exports = { signUp, login, addRefresh, signOut };
