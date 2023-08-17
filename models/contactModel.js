const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);