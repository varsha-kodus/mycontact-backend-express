const express = require("express");
const router = express.Router();
const {  
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact  
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

/* #swagger.tags = ['Contacts'] */
router.get("/api/contacts", validateToken, getContacts);

/* #swagger.tags = ['Contacts'] */
router.post("/api/contacts", validateToken, createContact);

/* #swagger.tags = ['Contacts'] */
router.get("/api/contacts/:id", validateToken, getContact);

/* #swagger.tags = ['Contacts'] */
router.put("/api/contacts/:id", validateToken, updateContact);

/* #swagger.tags = ['Contacts'] */
router.delete("/api/contacts/:id", validateToken, deleteContact);

module.exports = router;
