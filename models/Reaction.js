// Import necessary components from Mongoose library
const { Schema, Types } = require("mongoose");

// Define a reaction schema using the Schema constructor
const reactionSchema = new Schema(
  {
    // Define the reactionId field
    reactionId: {
      // Field type is ObjectId, which is generated using Types.ObjectId
      type: Schema.Types.ObjectId,
      // Default value is a new ObjectId generated when a reaction is created
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      // Field type is String
      type: String,
      // Field is required
      required: true,
      maxlength: 280,
      default: "dummy comment",
    },
    // Define the username field
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      // Field type is Date
      type: Date,
      // Default value is the current date and time when a reaction is created
      default: Date.now,
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
  },
  {
    // Define options for toJSON serialization
    toJSON: {
      // Include getters in the JSON representation
      getters: true,
    },
    // Exclude the virtual 'id' field from toJSON output
    id: false,
  }
);

reactionSchema
  // Getter
  .get(function () {
    return `${this.createdAt.toLocaleDateString()}`;
  });

// Export the reactionSchema module
module.exports = reactionSchema;
