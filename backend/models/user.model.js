import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		empid: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		firstname: { type: String},
		lastname: { type: String},
		mobile : { type : Number},
		address: { type: String},
		profilePhoto: { type: String },
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
		loginAttempts: {
			type: Number,
			default: 0,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		
	},
	{ timestamps: true }
	
);

export const User = mongoose.model("User", userSchema);
