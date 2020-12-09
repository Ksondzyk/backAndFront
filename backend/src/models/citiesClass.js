const { Schema, model } = require("mongoose");

const city = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfResidents: {
    type: String,
    required: true,
  },
  square: {
    type: String,
    required: true,
  },
  yearOfFoundation: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
// city.method("toClient", function () {
//   const city = this.toObject();
//   city.id = city._id;
//   delete city._id;
//   return city;
// });
module.exports = model("Cities", city);
