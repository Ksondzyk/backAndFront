const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const router = Router();
const authenticateJWT = require("../middleware/auth");

router.post("/", authenticateJWT, async (req, res) => {
  res.status(200).json({
    statusUser: "login done",
    status: 200,
    user: true,
  });
});

module.exports = router;
