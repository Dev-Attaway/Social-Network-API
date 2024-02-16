const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/students
router.route("/").get(getUsers).post(createUser);

// /api/students/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;
