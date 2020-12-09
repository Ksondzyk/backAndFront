const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  delete req.headers.authorization;
  if (!req.headers.authorization) {
    res.status(200).json({ user: false, status: 200, text: "logout done" });
  } else {
    res.status(203).json({ user: true, status: 203, text: "logout error" });
  }
});

module.exports = router;
