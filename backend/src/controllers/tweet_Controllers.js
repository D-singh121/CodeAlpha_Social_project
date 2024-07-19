import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from '../models/user_model.js'
import { Tweet } from '../models/tweet_model.js';


const createTweet = asyncHandler(async (req, res) => {
	try {
		const { description, id } = req.body;
		if (!description || !id) {
			return res.status(401).json({
				message: "Fields are required.",
				success: false
			});
		};
		const user = await User.findById(id).select("-password");
		await Tweet.create({
			description,
			userId: id,
			userDetails: user
		});
		return res.status(201).json({
			message: "Tweet created successfully.",
			success: true,
		})
	} catch (error) {
		console.log(error);
	}
});

const deleteTweet = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await Tweet.findByIdAndDelete(id);
		return res.status(200).json({
			message: "Tweet deleted successfully.",
			success: true
		})
	} catch (error) {
		console.log(error);
	}
});

const likeOrDislike = asyncHandler(async (req, res) => {
	try {
		const tweetId = req.params.id;   // from url param
		const loggedInUserId = req.body.id;  // from body

		const tweet = await Tweet.findById(tweetId);
		if (tweet.like.includes(loggedInUserId)) {
			// dislike
			await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
			return res.status(200).json({
				message: "User disliked your tweet."
			})
		} else {
			// like
			await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
			return res.status(200).json({
				message: "User liked your tweet."
			})
		}
	} catch (error) {
		console.log(error);
	}
})

const getAllTweets = asyncHandler(async (req, res) => {
	// loggedInUser ka tweet + following user tweet
	try {
		const loggedInUser_ID = req.params.id;
		const loggedInUser = await User.findById(loggedInUser_ID);

		const loggedInUserTweets = await Tweet.find({ userId: loggedInUser_ID });  // tweet me current loggedIn user ki id match karenge
		const followingUsersTweet = await Promise.all(loggedInUser.following.map((otherUsersId) => {
			return Tweet.find({ userId: otherUsersId });
		}));
		return res.status(200).json({
			tweets: loggedInUserTweets.concat(...followingUsersTweet), // both logged and followings users tweets.
		})
	} catch (error) {
		console.log(error);
	}
});

const getFollowingTweets = asyncHandler(async (req, res) => {
	try {
		const loggedInUser_ID = req.params.id;
		const loggedInUser = await User.findById(loggedInUser_ID);

		const followingUsersTweet = await Promise.all(loggedInUser.following.map((otherUsersId) => {
			return Tweet.find({ userId: otherUsersId });
		}));
		return res.status(200).json({
			tweets: [].concat(...followingUsersTweet),
		})
	} catch (error) {
		console.log(error);
	}
});

export { createTweet, deleteTweet, likeOrDislike, getAllTweets, getFollowingTweets };