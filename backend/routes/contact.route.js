import express from "express";
import { createContact,getContacts,deleteContact,updateContactResponse } from "../controllers/contact.controller.js";

const router = express.Router();



/** POST: http://localhost:8080/api/contact */
router.post('/contact', createContact);

/** GET: http://localhost:8080/api/contacts */
router.get('/getcontact', getContacts);

/** DELETE: http://localhost:8080/api/contact/:id */
router.delete('/contact/:id', deleteContact);

router.patch('/contact/:id/response', updateContactResponse);

export default router;