const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },

  birthday: {
    type: String,
    reuired: true,
  },
});

module.exports = model("User", userSchema);
