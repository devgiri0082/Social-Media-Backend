const userModel = require("../Model/userModel");
let checkValidity = async (follower, following) => {
  if (!follower) return { code: 400, status: "Follower is not valid" };
  if (!following) return { code: 400, status: "Following is not valid" };
  return undefined;
};
let follow = async (myUserName, otherUserName) => {
  try {
    if (myUserName === otherUserName)
      return { code: 400, status: "You can't follow yourself" };
    let follower = await userModel.findOne({ userName: myUserName });
    let following = await userModel.findOne({ userName: otherUserName });
    console.log(follower, following);
    let valid = await checkValidity(follower, following);
    if (valid) return valid;
    let alreadyExist = await userModel.findOne({
      _id: following["_id"],
      followers: follower["_id"],
    });
    if (alreadyExist) return { code: 400, status: `already following` };
    await userModel.updateOne(
      { _id: follower["_id"] },
      {
        $push: {
          following: following["_id"],
        },
      }
    );
    await userModel.updateOne(
      { _id: following["_id"] },
      {
        $push: { followers: follower["_id"] },
      }
    );
    return { code: 200, status: `${myUserName} is following ${otherUserName}` };
  } catch (err) {
    console.log(err);
    return { code: 500, status: err };
  }
};
let unfollow = async (myUserName, otherUserName) => {
  try {
    if (myUserName === otherUserName)
      return { code: 400, status: "You can't unfollow yourself" };
    let follower = await userModel.findOne({ userName: myUserName });
    let following = await userModel.findOne({ userName: otherUserName });
    console.log(follower, following);
    let valid = await checkValidity(follower, following);
    if (valid) return valid;
    let alreadyExist = await userModel.findOne({
      _id: following["_id"],
      followers: follower["_id"],
    });
    if (!alreadyExist)
      return {
        code: 400,
        status: `${myUserName} is not following ${otherUserName}`,
      };
    await userModel.update(
      { _id: follower["_id"] },
      { $pull: { following: following["id"] } }
    );
    await userModel.update(
      { _id: following["_id"] },
      { $pull: { followers: follower["id"] } }
    );
    return {
      code: 200,
      status: `${myUserName} has unfollowed ${otherUserName}`,
    };
  } catch (err) {
    console.log(err);
    return { code: 500, status: err };
  }
};
let remove = async (myUserName, otherUserName) => {
  try {
    if (myUserName === otherUserName)
      return { code: 400, status: "You can't remove yourself" };
    let me = await userModel.findOne({ userName: myUserName });
    let notMe = await userModel.findOne({ userName: otherUserName });
    let valid = await checkValidity(me, notMe);
    if (valid) return valid;
    console.log(me, notMe);
    let alreadyExist = await userModel.findOne({
      _id: me["_id"],
      followers: notMe["_id"],
    });
    console.log(alreadyExist);
    if (!alreadyExist)
      return {
        code: 400,
        status: `${myUserName} is not following ${otherUserName}`,
      };
    await userModel.update(
      { _id: me["_id"] },
      { $pull: { followers: notMe["id"] } }
    );
    await userModel.update(
      { _id: notMe["_id"] },
      { $pull: { following: me["id"] } }
    );
    return {
      code: 200,
      status: `${myUserName} has removed ${otherUserName}`,
    };
  } catch (err) {
    console.log(err);
    return { code: 500, status, err };
  }
};

module.exports = { follow, unfollow, remove };
