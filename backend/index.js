const express = require("express");
const app = express();
const redis = require("redis");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const citiesRoutes = require("./src/routes/cities");
const addRoutes = require("./src/routes/addCity");
const authRouters = require("./src/routes/login");
const logoutRouthers = require("./src/routes/logout");
const registrationRouters = require("./src/routes/registration");
const bodyParser = require("body-parser");
const authMidelware = require("./src/middleware/middleware");
const auth = require("./src/routes/auth");
const cors = require("cors");

const MONGODB_URL = `mongodb+srv://Roman:2OGmcbaZhEs4iHVR@cluster0.2rnc3.mongodb.net/cities`;

app.use(
  cors({
    "Access-Control-Allow-Headers": ["authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authMidelware);
app.use("/cities", citiesRoutes);
app.use("/addcity", addRoutes);
app.use("/login", authRouters);
app.use("/registration", registrationRouters);
app.use("/logout", logoutRouthers);
app.use("/auth", auth);
const PORT = process.env.PORT || 4000;
async function start() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is rinning ${PORT}`);
    });
  } catch (e) {
    console.log(`error mongo DB ${e}`);
  }
}
start();

const password = "TbHQHg9sVlBORaqX";
