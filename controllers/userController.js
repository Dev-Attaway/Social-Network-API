const { User } = require("../models");

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

  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add friendId to the user's list of friends
      foundUser.friends.push(friendId);
      await foundUser.save();

      res.json({ message: "Friend added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async removeFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove friendId from the user's list of friends
      foundUser.friends = foundUser.friends.filter((_id) => _id !== friendId);
      await foundUser.save();

      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
