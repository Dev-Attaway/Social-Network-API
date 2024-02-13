const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [3, "Username must be at least 3 characters long"], // Minimum length of 3 characters
      maxlength: [20, "Username cannot exceed 20 characters"], // Maximum length of 20 characters
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
