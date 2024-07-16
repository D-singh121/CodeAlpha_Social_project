import { User } from '../models/user_model.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const registerUser = asyncHandler(async (req, res, next) => {
	try {
		const { name, userName, email, password } = req.body; // get the form values
		if (!name || !userName || !email || !password) {
			return res.status(401).json({
				message: "Please fill all required field!",
				success: false,
			});
		}

		const isEmailexists = await User.findOne({ email }); // is user already registered.
		if (isEmailexists) {
			return res.status(401).json({
				message: "Email already exist , Please go for login !",
				success: false
			})
		}
		const hashedPassword = await bcrypt.hash(password, 16); // hashing the password before saving in database;
		// saving the user in database with hashed password;
		await User.create({
			name,
			userName,
			email,
			password: hashedPassword
		});

		return res.status(201).json({
			message: "User created successfully...!",
			success: true
		})

	} catch (error) {
		console.log(error);
	};
});


const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(401).json({
			message: " Please fill all required fields! ",
			success: false,
		})
	}
	const user = await User.findOne({ email }); // checking is User registered or not if not then redirect to register.
	if (!user) {
		return res.status(401).json({
			message: "Invalid email or password!",
			success: false
		})
	};

	const isPasswordMatched = await bcrypt.compare(password, user.password); // matching the  password entered and hashed password from database.
	if (!isPasswordMatched) {
		return res.status(401).json({
			message: "Invalid email or password",
			success: false
		});
	};

	// getting registered user Id fetched from database;
	const tokendata = {
		id: user._id
	}

	// generating the jwt token with userId , jwt secret and expiry time and sending in cookies with response ;
	const token = jwt.sign(tokendata, process.env.JWTSECRET, { expiresIn: "1d" });

	return res.status(200).cookie("token", token, { httpOnly: true }).json({
		message: `Welcome back ${user.userName}`,
		user,
		success: true,
	})

});

const logoutUser = asyncHandler((req, res) => {
	if (!req.cookies.token) {
		// User is already logged out, send informative response
		return res.status(200).json({
			success: false,
			message: "User is already logged out."
		});
	}

	return res.status(200).cookie("token", "", {
		httpOnly: true,
		expires: new Date(Date.now()),
	}).json({
		success: true,
		message: "User logged out successfully!"
	});
});

// before writing this create a authentication middleware.
const bookmark = asyncHandler(async (req, res) => {
	try {
		const loggedInUserId = req.body.id;
		const tweetId = req.params.id;
		const user = await User.findById(loggedInUserId);
		if (user.bookmarks.includes(tweetId)) {
			// remove
			await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
			return res.status(200).json({
				message: "Removed from bookmarks."
			});
		} else {
			// bookmark
			await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
			return res.status(200).json({
				message: "Saved to bookmarks."
			});
		}
	} catch (error) {
		console.log(error);
	}
});


const getMyProfile = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id).select("-password");
		return res.status(200).json({
			user,
		})
	} catch (error) {
		console.log(error);
	}
});

// for Whom to follow you.
const getOtherUsers = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
		// current login user ko unselect karke baki sab users ko fetch karenge.
		if (!otherUsers) {
			return res.status(401).json({
				message: "Currently do not have any users."
			})
		};
		return res.status(200).json({
			otherUsers
		})
	} catch (error) {
		console.log(error);
	}
});

const follow = asyncHandler(async (req, res) => {
	// If USER-A follow to the USER-B then User'A' will be store as a 'follower' in USER-B and USER-B as 'following' in USER-A
	try {
		const loggedInUserId = req.body.id;  // current logged user id of USER "A"
		const anotherUserId = req.params.id;  // The user_id, whom we want to follow. "B"

		const loggedInUser = await User.findById(loggedInUserId); //USER-A
		const anotherUser = await User.findById(anotherUserId); // USER-B

		if (!anotherUser.followers.includes(loggedInUserId)) {
			await anotherUser.updateOne({ $push: { followers: loggedInUserId } }); //current logged USER-A will get stored as a follower in USER-B 
			await loggedInUser.updateOne({ $push: { following: anotherUserId } });
		} else {
			return res.status(400).json({
				message: `${loggedInUser.name} already followed to ${anotherUser.name}`
			})
		};
		return res.status(200).json({
			message: `${loggedInUser.name} is now following to ${anotherUser.name}`,
			success: true
		})

	} catch (error) {
		console.log(error);
	}
});

const unfollow = asyncHandler(async (req, res) => {
	try {
		const loggedInUserId = req.body.id; // current logged user id of USER "A"
		const otherUserId = req.params.id;    // The user_id, whom we want to follow. "B"

		const loggedInUser = await User.findById(loggedInUserId);
		const otherUser = await User.findById(otherUserId);

		if (loggedInUser.following.includes(otherUserId)) {
			await otherUser.updateOne({ $pull: { followers: loggedInUserId } });
			await loggedInUser.updateOne({ $pull: { following: otherUserId } });
		} else {
			return res.status(400).json({
				message: `User has not followed yet`
			})
		};
		return res.status(200).json({
			message: `${loggedInUser.name} unfollow to ${otherUser.name}`,
			success: true
		})
	} catch (error) {
		console.log(error);
	}
});


export { registerUser, loginUser, logoutUser, bookmark, getMyProfile, getOtherUsers, follow, unfollow };


