const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

/* #swagger.tags = ['Users'] */
router.post("/api/users/register", registerUser);

/* #swagger.tags = ['Users'] */
router.post("/api/users/login", loginUser);

/* #swagger.tags = ['Users']
   #swagger.security = [{ "bearerAuth": [] }] */
router.get("/api/users/current", validateToken, currentUser);

module.exports = router;
