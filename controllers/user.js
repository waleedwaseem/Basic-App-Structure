const { User } = require("../models");
const { isEmailValid } = require("../utils");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      if (users.length < 1)
        return res.status(404).json({ users: "Users not found" });

      return res.status(200).json({ users: users });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const user = await User.findByPk(user_id);
      if (!user) return res.status(404).json({ user: "User not found" });
      return res.status(200).json({ user: user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "some data is missing" });
      }
      if (!isEmailValid(email))
        return res.status(400).json({ message: "email is not valid" });

      const user = await User.findOne({ where: { email: email } });
      if (user)
        return res
          .status(400)
          .json({ message: `${user.email} already exsits` });
      const createdUser = await User.create({
        email,
        password,
        name,
      });
      return res
        .status(200)
        .json({ id: createdUser.id, message: "User created successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { user_id } = req.params;

      const user = await User.destroy({ where: { id: user_id } });
      if (!user) return res.status(404).json({ user: "User not found" });
      return res.status(200).json({ message: "User removed successfully!" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { name, password, email } = req.body;
      if (!isEmailValid(email))
        return res.status(400).json({ message: "email is not valid" });
      const user = await findOne({ where: { email: email } });
      if (user)
        return res.status(400).json({ message: "email already exsits" });

      await User.update(
        {
          name,
          email,
          password,
        },
        {
          where: { id: user_id },
        }
      );

      return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};
