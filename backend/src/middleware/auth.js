const jwt = require("jsonwebtoken");

const accessTokenSecret = "somerandomaccesstoken";

module.exports = authenticateJWT = async (req, res, next) => {
  const authHeader = await req.headers.authorization;

  if (authHeader) {
    await jwt.verify(authHeader, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

