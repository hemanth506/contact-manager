const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controller/contactControllers");

// Get all contacts
router.get("/", getContacts);

// Get a contact using Id
router.get("/:id", getContact);

// Create a contact
router.post("/", createContact);

// Update a contact using ID
router.put("/:id", updateContact);

// Delete a contact
router.delete("/:id", deleteContact);

module.exports = router;
