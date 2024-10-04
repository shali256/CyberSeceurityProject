import express from "express";
import { createContact,getContacts,deleteContact,updateContactResponse,getContactByUsername } from "../controllers/contact.controller.js";

const router = express.Router();



/** POST: http://localhost:8080/api/contact */
router.post('/contact', createContact);

/** GET: http://localhost:8080/api/contacts */
router.get('/getcontact', getContacts);

/** DELETE: http://localhost:8080/api/contact/:id */
router.delete('/contact/:id', deleteContact);

router.patch('/contact/:id/response', updateContactResponse);

router.get('/contact/:username', getContactByUsername)

export default router;