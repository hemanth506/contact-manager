const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc - will get all the contacts which was created by the user
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.body.user.id });
  res.status(200).send(contacts);
});

// @desc - Will get contact only if he has created it
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).send(contact);
});

// @desc - create contact and will save the user id along with it which is used to fetch the contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).send(contact);
});

// @desc - will have access only if he has created the contact which he is accessing
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  // if a differnet user is trying to update a contact
  if (req.user.id != contact.user_id) {
    res.status(403);
    throw new Error("Don't have access to update contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.status(202).send(updatedContact);
});

// @desc - will have access only if he has created the contact which he is accessing
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  // if a differnet user is trying to delete a contact
  if (req.user.id !== contact.user_id) {
    res.status(403);
    throw new Error("Don't have access to delete contact");
  }

  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(204).send(deletedContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
