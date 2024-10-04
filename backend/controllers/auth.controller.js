import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
	const {empid, email, password, name } = req.body;

	try {
		if (!empid || !email || !password || !name) {
			throw new Error("All fields are required");
		}

		// Validate empid pattern (e.g., G/7630/75)
		const empIdPattern = /^G\/\d{4}\/\d{2}$/;
		if (!empIdPattern.test(empid)) {
			return res.status(400).json({ success: false, message: "Invalid empid format. Expected format: G/7630/75" });
		}

		const userAlreadyExists = await User.findOne({ empid });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			empid,
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// jwt
		generateTokenAndSetCookie(res, user._id);

		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const login = async (req, res) => {
	const { name, password } = req.body;
	try {
		const user = await User.findOne({ name });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Check if the user is blocked
		if (user.isBlocked) {
			return res.status(403).json({
				success: false,
				message: "You have tried too many times. Your account is blocked. Contact our support team at 123-456-7890.",
			});
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			// Increment login attempts
			user.loginAttempts += 1;

			// Block the user if attempts exceed 5
			if (user.loginAttempts >= 5) {
				user.isBlocked = true;
			}

			await user.save();

			return res.status(400).json({
				success: false,
				message: user.isBlocked
					? "You have tried too many times. Your account is blocked. Contact our support team at 123-456-7890."
					: "Invalid credentials",
			});
		}

		// Reset login attempts on successful login
		user.loginAttempts = 0;
		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	const { name } = req.body;
	try {
		const user = await User.findOne({ name });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const AdminAdd = async (req, res) => {
	const { empid, email, password, name, firstname, lastname, mobile, address } = req.body;

	try {
		if (!empid || !email || !password || !name || !firstname || !lastname || !mobile || !address ) {
			throw new Error("All fields are required");
		}

		// Validate empid pattern (e.g., G/7630/75)
		const empIdPattern = /^[A-Z]\/\d{4}\/\d{2}$/;
		if (!empIdPattern.test(empid)) {
			return res.status(400).json({ success: false, message: "Invalid empid format. Expected format: G/7630/75" });
		}

		const userAlreadyExists = await User.findOne({ empid });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = new User({
			empid,
			email,
			password: hashedPassword,
			name,
			firstname,
			lastname,
			mobile,
			address,
			isVerified: true, // Set to true as verification is not needed
		});

		await user.save();

		// Generate JWT and set as cookie
		generateTokenAndSetCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { empid, email, password, name, firstname, lastname, mobile, address, profilePhoto } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.empid = empid || user.empid;
        user.email = email || user.email;
        user.name = name || user.name;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.mobile = mobile || user.mobile;
        user.address = address || user.address;
		user.profilePhoto = profilePhoto || user.profilePhoto;

        if (password) {
            user.password = await bcryptjs.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.log("Error in updateUser ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in deleteUser ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


export const getUserLogins = async (req, res) => {
	try {
	  // Fetch users and their last login times
	  const users = await User.find({}, 'empid lastLogin').lean();
	  res.json(users);
	} catch (error) {
	  console.error('Error fetching login data:', error);
	  res.status(500).send('Server Error');
	}
  };
  
  export const toggleUserBlock = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Toggle the isBlocked status
        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({ success: true, message: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'}.` });
    } catch (error) {
        console.error("Error toggling user block status: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};