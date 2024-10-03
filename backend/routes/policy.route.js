import express from "express";
import { savePolicyReadStatus, getReadPolicies } from "../controllers/policy.controller.js"

const router = express.Router();

router.post('/read', savePolicyReadStatus);
router.get('/read-policies', getReadPolicies);

export default router