const express = require("express");
const router = express.Router();
const validate = require("../middleware/validateHandler");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controller/contactControllers");

router.use(validate);

router.get("/", getContacts); // Get all contacts
router.get("/:id", getContact); // Get a contact using Id
router.post("/", createContact); // Create a contact
router.put("/:id", updateContact); // Update a contact using ID
router.delete("/:id", deleteContact); // Delete a contact

module.exports = router;
