const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const User = require("../models/users");
const { body, validationResult } = require("express-validator");

router.post("/", body("email").isEmail(), async (req, res) => {
  try {
    const { email, password, birthday, name } = req.body;
    const candidate = await User.findOne({ email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(`validate error ${errors.array()[0].msg}`);
    }
    if (candidate) {
      res.status(200).json("User with such email exist");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        name,
        password: hashPassword,
        birthday,
      });
      await user.save();
      res.send("user ADD");
    }
  } catch (err) {
    console.log(`register ${err}`);
  }
});

module.exports = router;
