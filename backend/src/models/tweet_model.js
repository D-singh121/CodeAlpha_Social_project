import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
	description: {
		type: String,
		trim: true,
		required: true
	},
	like: {
		type: Array,
		default: []
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	userDetails: {
		type: Array,
		default: []
	},
}, { timestamps: true });
export const Tweet = mongoose.model("Tweet", tweetSchema);