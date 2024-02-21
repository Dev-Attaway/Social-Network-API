const { User } = require("../models");

module.exports = {
  // Retrieve all users from the database
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users); // Return the list of users
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Add a friend to a user's list of friends
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      // Find the user by ID
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" }); // If user not found, return 404 Not Found
      }

      // Add friendId to the user's list of friends
      foundUser.friends.push(friendId);
      await foundUser.save(); // Save changes to the database

      res.json({ message: "Friend added successfully" }); // Return success message
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Remove a friend from a user's list of friends
  async removeFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      // Find the user by ID
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" }); // If user not found, return 404 Not Found
      }

      // Remove friendId from the user's list of friends
      foundUser.friends = foundUser.friends.filter((_id) => _id !== friendId);
      await foundUser.save(); // Save changes to the database

      res.json({ message: "Friend removed successfully" }); // Return success message
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Retrieve a single user by ID
  async getSingleUser(req, res) {
    try {
      // Find the user by ID and exclude the '__v' field
      const foundUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!foundUser) {
        return res.status(404).json({ message: "No User with that ID" }); // If user not found, return 404 Not Found
      }

      res.json({ User: foundUser }); // Return the found user
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error", error: err }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Create a new User
  async createUser(req, res) {
    try {
      // Create a new user using the data from the request body
      const createdUser = await User.create(req.body);
      res.json(createdUser); // Return the created user
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error", error: err }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Delete a User
  async deleteUser(req, res) {
    try {
      // Find and remove the user by ID
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!removedUser) {
        return res.status(404).json({ message: "No such User exists" }); // If user not found, return 404 Not Found
      }

      res.json({ message: "User successfully deleted" }); // Return success message
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error", error: err }); // Return 500 Internal Server Error if there's an error
    }
  },

  // Update a User's information
  async updateUser(req, res) {
    try {
      // Find and update the user by ID with the data from the request body
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.status(200).json(updatedUser); // Return the updated user
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error", error: err }); // Return 500 Internal Server Error if there's an error
    }
  },
};
