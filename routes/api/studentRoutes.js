const router = require("express").Router();
const {
  getUsers,
  getSingleStudent: getSingleUser,
  createStudent,
  deleteStudent: deleteUser,
  addAssignment,
  removeAssignment,
} = require("../../controllers/studentController");

// /api/students
router.route("/").get(getUsers).post(createStudent);

// /api/students/:studentId
router.route("/:studentId").get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route("/:studentId/assignments").post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route("/:studentId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;
