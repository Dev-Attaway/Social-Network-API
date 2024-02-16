const { Thought, User } = require("../models");

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try {
      const foundThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      // .populate("users") will replace the ObjectIDs in the users array with the actual user documents referenced by those IDs.
      //         .populate("Users");

      if (!foundThought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(foundThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const createdThought = await Thought.create(req.body);
      res.json(createdThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const foundThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!foundThought) {
        res.status(404).json({ message: "No Thought with that ID" });
      }
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const foundThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!foundThought) {
        res.status(404).json({ message: "No Thought with this id!" });
      }

      res.json(foundThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
