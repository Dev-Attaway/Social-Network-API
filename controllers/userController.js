const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single User
  async getSingleUser(req, res) {
    try {
      const foundUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!foundUser) {
        return res.status(404).json({ message: "No User with that ID" });
      }

      res.json({
        User: foundUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const CreatedUser = await User.create(req.body);
      res.json(CreatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!removedUser) {
        return res.status(404).json({ message: "No such User exists" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.status(200).json(result);
      console.log(`updated: ${result}`);
    } catch (err) {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  },
};
