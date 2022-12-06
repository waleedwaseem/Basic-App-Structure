const { User } = require("../models");
const ApiError = require("../utils/ApiError");
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

  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new ApiError(400, "Some data is missing");
      }
      const createdUser = await User.create({
        email,
        password,
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
