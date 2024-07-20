import { User } from '../models/user_model.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";


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

const logoutUser = (req, res) => {
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
};

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


// forget and reset password 

const forgetPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email || "") {
			return res.status(401).json({
				message: "Please provide your email !",
				success: false
			})
		};

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: "Please enter valid email, you are not registered !",
				success: false
			})
		}

		const userId = user._id;
		console.log(userId);
		// Generate a unique JWT token for the user that contains the user's id
		const resetToken = jwt.sign({ userId }, process.env.JWTSECRET, { expiresIn: "1h", });
		console.log(resetToken);

		// Send the token to the user's email
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.ADMIN_EMAIL,   // host email
				pass: process.env.ADMIN_EMAIL_PASSWORD, // host emails part
			},
		});

		// Email configuration
		const mailOptions = {
			from: process.env.ADMIN_EMAIL,
			to: email, //receiver email
			subject: "Reset Password",
			html: `<h1>Reset Your Password</h1>
           	<p>Click on the following link to reset your password:</p>
		    <p><a href="http://localhost:5173/resetPass/${resetToken}">Reset Password</a></p>
    		<p>The link will expire in 10 minutes.</p>
    		<p>If you didn't request a password reset, please ignore this email.</p>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
				// do something useful
			}
		});


		res.status(200).json({
			message: `Reset Token has been sent to ${user.email}`,
			success: true
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: err.message });
	}
};

const resetPassword = async (req, res, next) => {
	try {
		const { resetToken } = req.params; // url param se token ko get kar lenge 
		const { newPassword } = req.body; // user se new password input lenge;
		// console.log(resetToken, newPassword);

		const decodedToken = await jwt.verify(resetToken, process.env.JWTSECRET); // token ko verify karke usme se user ko nikal lenge.

		const userId = decodedToken.userId // user ki id ko get kar rahe hai decoded token se 
		console.log(userId);

		const hashedNewPassword = await bcrypt.hash(newPassword, 16) // hashing the new password entered by user.

		const result = await User.findOneAndUpdate(
			{ _id: userId }, // Match the document by user ID
			{ $set: { password: hashedNewPassword } }, // Set the new password
			{ new: true } // Return the updated document
		); // new hashed password ko database me update kar denge .

		if (!result) {
			return res.status(404).json({
				status: false,
				message: "User not found"
			});
		}

		res.status(201).json({
			status: true,
			message: "Password Updated successfully.. !"
		});
		// res.redirect('/login');
	} catch (error) {
		console.error("Error updating password:", error);
		return res.status(500).json({
			status: false,
			message: "Internal server error.. !"
		})
	}
}


export { registerUser, loginUser, logoutUser, bookmark, getMyProfile, getOtherUsers, follow, unfollow, resetPassword, forgetPassword };


