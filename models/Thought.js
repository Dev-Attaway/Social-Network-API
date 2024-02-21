const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction"); // Import the Reaction schema

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [3, "Username must be at least 3 characters long"], // Minimum length of 3 characters
      maxlength: [280, "Username cannot exceed 20 characters"], // Maximum length of 20 characters
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set default value to the current timestamp
      required: true,
      // Define a getter method to format the timestamp on query
      get: function (value) {
        // Use toLocaleString() with appropriate options for the desired format
        return new Date(value).toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        });
      },
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true, // Ensure that getters are included when converting to JSON
    },
  }
);

thoughtSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });
thoughtSchema
  // Getter
  .get(function () {
    return `${this.createdAt.toLocaleDateString()}`;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
