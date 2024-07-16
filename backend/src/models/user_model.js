import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minLength: [3, "Name must contain at least 3 characters!"],
		maxLength: [30, "Name can not exceed  30 characters!"]
	},

	userName: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minLength: [3, "Name must contain at least 3 characters!"],
		maxLength: [30, "Name can not exceed  30 characters!"]
	},

	email: {
		type: String,
		required: [true, "Please provide your email!"],
		unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		required: [true, "Please provide password"],
		minLength: [8, "Password must containe atleast 8 characters!"],
		maxLength: [16, "Password can not more than 16 characters!"],
		Select: false
	},

	followers: {
		type: Array,
		default: []
	},
	following: {
		type: Array,
		default: []
	},
	bookmarks: {
		type: Array,
		default: []
	}

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);