const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

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

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const first = username.split(" ")[0];
    const email = first + `@example.com`;

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);
  const reactions = userData.map(({ username }) => ({ username }));

  // Add thoughts to the collection and await the results
  await Thought.create({
    thoughtText: "test",
    username: "test user",
    reactions: reactions,
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
