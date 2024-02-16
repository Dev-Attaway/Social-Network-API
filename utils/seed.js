const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { generateThoughts, generateUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  // We have created this dummy data from data.js
  // these functions return a array of generated users and generated thoughts
  // 5 determines how many random thoughts will be created
  const users = generateUsers();
  const thoughts = generateThoughts(5);

  // we must now create the mongoo DB items
  const createdUsers = await User.insertMany(users);

  // Create thoughts
  const createdThoughts = await Thought.insertMany(thoughts);
  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    // Filter thoughts that belong to this user
    const userThoughts = createdThoughts.filter(
      (thought) => thought.username === user.username
    );
    // Get thought ids
    const thoughtIds = userThoughts.map((thought) => thought._id);
    // Update user with thought ids
    await User.findByIdAndUpdate(user._id, {
      $push: { thoughts: { $each: thoughtIds } },
    });
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
