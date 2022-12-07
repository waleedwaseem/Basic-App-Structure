const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll({ where: { archive: false } });
      if (!users.length) throw new ApiError(404, "User not found");
      res.send({
        code: 200,
        success: true,
        message: "Users list",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
          archive: false,
        },
      });
      if (!user) {
        throw new ApiError(404, "User not found");
      }
      res.send({
        code: 200,
        success: true,
        message: "User data",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ApiError(400, "Some data is missing");
      }
      const user = await User.findOne({
        where: { email: email, archive: false },
      });
      if (!user) throw new ApiError(400, "Email or Password is Incorrect");
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword)
        throw new ApiError(400, "Email or Password is Incorrect");
      res.send({
        code: 200,
        success: true,
        message: "User Signed In SuccessFully",
        data: user.email,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new ApiError(400, "Some data is missing");
      }
      const genSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, genSalt);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      res.send({
        code: 200,
        success: true,
        message: "User Created Succcessfully",
        data: createdUser.email,
      });
    } catch (err) {
      next(err);
    }
  },

  archive: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.update(
        {
          archive: true,
        },
        {
          where: { id },
        }
      );
      if (!user[0]) throw new ApiError(404, "User not found");
      res.send({
        code: 200,
        success: true,
        message: "User Removed",
        data: user.email,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, password, email } = req.body;
      const user = await User.update(
        {
          name,
          email,
          password,
        },
        {
          where: { id },
        }
      );
      if (!user[0]) throw new ApiError(404, "User not found");
      res.send({
        code: 200,
        success: true,
        message: "User Updated Successfully",
        data: user.email,
      });
    } catch (err) {
      next(err);
    }
  },
};
