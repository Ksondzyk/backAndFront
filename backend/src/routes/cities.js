const { Router } = require("express");
const Cities = require("../models/citiesClass");
const authenticateJWT = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  const { query } = req.query;
  if (query !== undefined) {
    const cities = await Cities.find({ title: `${query}` }).populate(
      "userId",
      "email name"
    );
    if (!cities.length) {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(404).json("404  not found");
    }
    res.set("Access-Control-Allow-Origin", "*");
    res.send(cities);
  } else {
    const cities = await Cities.find();
    const getPeoplesAndResidents = cities.map(
      ({ title, numberOfResidents, id }) => ({
        title,
        numberOfResidents,
        id,
      })
    );
    res.set("Access-Control-Allow-Origin", "*");
    res.send(getPeoplesAndResidents);
  }
});

router.get("/:id", async (req, res) => {
  const city = await Cities.findById(req.params.id);
  res.status(200).json(city);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  const cities = await Cities.findOneAndDelete(req.params.id);
  res.status(200).json({ cities, city: {}, status: 200 });
});

router.put("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  console.log("req.body", req.body);

  const city = await Cities.findByIdAndUpdate(id, req.body);
  console.log(city);
  res.status(200).json({ city, status: 200 });
});

module.exports = router;
