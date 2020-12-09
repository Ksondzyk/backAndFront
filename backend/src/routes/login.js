const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const router = Router();

const accessTokenSecret = "somerandomaccesstoken";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({
      email,
      password,
    });
    if (candidate) {
      const accessToken = jwt.sign(
        { email: candidate.email },
        accessTokenSecret,
        { expiresIn: "5d" }
      );

      const areSame = bcrypt.compare(password, candidate.password);
      if (areSame) {
        res.set("authorization", accessToken);
        res.status(200).json({
          statusUser: "login done",
          status: 200,
          accessToken,
          user: true,
        });
      } else {
        const error = "user is upsend";
        res.status(200).json({ status: 203, error, user: false });
      }
    } else {
      res
        .status(200)
        .json({ error: "user is upsend", status: 203, user: false });
    }
  } catch (e) {
    console.log(`login err ${e}`);
  }
});

module.exports = router;

// router.post("/", authenticateJWT, async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const candidate = await User.findOne({
//       email,
//     });
//     if (candidate) {
//       const areSame = await bcrypt.compare(password, candidate.password);
//       if (areSame) {
//         req.session.user = candidate;
//         req.session.isInput = true;
//         req.session.save((err) => {
//           if (err) {
//             throw err;
//           }
//           res.status(200).json("login done");
//         });
//       } else {
//         res.json("user is upsend");
//       }
//     } else {
//       res.json("user is upsend");
//     }
//   } catch (e) {
//     console.log(`login err ${e}`);
//   }
// });
