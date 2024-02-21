const { Thought } = require("../models");

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

  async addReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
      // Find the Thought document by its ID
      const foundThought = await Thought.findById(thoughtId);
      if (!foundThought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      // Create a new reaction object using the Reaction schema
      const newReaction = {
        reactionBody,
        username,
        // createdAt will be automatically set to the current timestamp due to the default value in the Reaction schema
      };

      // Add the new reaction object to the reactions array of the Thought document
      foundThought.reactions.push(newReaction);

      // Save the updated Thought document back to the database
      await foundThought.save();

      res.json({
        message: "Reaction added successfully",
        thought: foundThought,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    try {
      // Find the Thought document by its ID
      const foundThought = await Thought.findById(thoughtId);
      if (!foundThought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      // Find the index of the reaction within the reactions array based on its ID
      const reactionIndex = foundThought.reactions.findIndex(
        (reaction) => reaction.reactionId.toString() === reactionId
      );
      if (reactionIndex === -1) {
        return res.status(404).json({ message: "Reaction not found" });
      }

      // Remove the reaction from the reactions array
      foundThought.reactions.splice(reactionIndex, 1);

      // Save the updated Thought document back to the database
      await foundThought.save();

      res.json({
        message: "Reaction deleted successfully",
        thought: foundThought,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
