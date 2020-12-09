const { Router } = require("express");
const Cities = require("../models/citiesClass");
const authenticateJWT = require("../middleware/auth");

const router = Router();

router.post("/", authenticateJWT, async (req, res) => {
  const city = new Cities({
    title: req.body.title,
    location: req.body.location,
    numberOfResidents: req.body.numberOfResidents,
    square: req.body.square,
    yearOfFoundation: req.body.yearOfFoundation,
    userId: req.user,
  });
  try {
    await city.save();
    res.status(200).json({ user: true, status: 200, text: "done", city });
  } catch (e) {
    console.log(`Object Cities ${e}`);
  }
});
module.exports = router;
