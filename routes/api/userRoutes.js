const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/students
router.route("/").get(getUsers).post(createUser);

// /api/students/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
