const ApiError = require("../utils/ApiError");
const { db } = require("../config/environments/firebase.js");
const { collection, getDocs } = require("firebase/firestore");
module.exports = {
  getAll: async (req, res, next) => {
    console.log(">>>>>>", db);
    try {
      const users = collection(db, "users");
      const userDocs = await getDocs(users);
      const userList = userDocs.docs.map((doc) => doc.data());
      res.send({
        code: 200,
        success: true,
        message: "Users list",
        data: userList,
      });
    } catch (err) {
      next(err);
    }
  },
};
