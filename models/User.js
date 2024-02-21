// Import necessary components from Mongoose library
const { Schema, model } = require("mongoose");

// Regular expression for validating email addresses
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// a schema to create a User model
const userSchema = new Schema(
  {
    // the username field
    username: {
      type: String,
      unique: true, // Username must be unique
      required: true, // Username is required
      trim: true, // Trim whitespace from the username
    },
    // the email field
    email: {
      type: String,
      unique: true, // Email must be unique
      required: true, // Email is required
      validate: {
        // Custom validator function to validate email format
        validator: function (email) {
          return emailRegex.test(email); // Test email format using regex
        },
        // Error message if email format is invalid
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    // the thoughts field as an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Reference the Thought model
      },
    ],
    // the friends field as an array of ObjectIds referencing the User model itself
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference the User model (self-referencing)
      },
    ],
  },
  {
    // Options for JSON serialization
    toJSON: {
      getters: true, // Include getters in the JSON representation
      virtuals: true, // Include virtual properties in the JSON representation
    },
    id: false, // Exclude the virtual 'id' field from toJSON output
  }
);

// a virtual property named 'friendCount' to calculate the number of friends a user has
userSchema
  .virtual("friendCount")
  // Getter function for 'friendCount'
  .get(function () {
    return `${this.friends.length}`; // Return the length of the friends array
  });

// Create the User model using the userSchema
const User = model("user", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
