import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	getAllUsers,
	AdminAdd,
	updateUser,
	deleteUser,
	getUserLogins,
	toggleUserBlock,

} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/users", verifyToken, getAllUsers);
router.post("/adminadd", AdminAdd);

router.put("/update-user/:userId", verifyToken, updateUser);
router.delete("/delete-user/:userId", verifyToken, deleteUser);

router.get('/logins', getUserLogins);

router.put("/toggle-block/:userId", verifyToken, toggleUserBlock);

export default router;
