const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  getUserById,
} = require("../controllers/userContoller");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// GET USER BY ID || GET
router.get('/get-user/:userId', getUserById)

module.exports = router;
