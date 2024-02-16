const { Schema, model } = require("mongoose");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (email) {
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // referencing the User model itself
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

const User = model("user", userSchema);

module.exports = User;
