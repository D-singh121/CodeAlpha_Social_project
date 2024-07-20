import { Button, Input } from "../components"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_URL_POINT } from "../Utils/Constant";
import toast from "react-hot-toast";


const ResetPassword = () => {
	const [newPassword, setnewPassword] = useState("");
	const navigate = useNavigate();


	const { resetToken } = useParams();

	const ResetPasswordHandler = async (e) => {
		e.preventDefault();
		const updatedPassword = newPassword
		console.log(resetToken, updatedPassword);
		try {
			const res = await axios.put(`${USER_API_URL_POINT}/resetPass/${resetToken}`, { newPassword: updatedPassword })
			if (res.status === 201) {
				navigate("/login")
			} else {
				console.log("Please type the new password !", res.data);
			}

			toast.success(res.data.message)
			console.log(res);

		} catch (error) {
			toast.error(error.response.data.message, { position: "top-center" })
			console.log(error);

		}
		setnewPassword("")
	}


	return (
		<section className="w-screen h-screen flex items-center justify-center'">
			<div className="flex items-center justify-evenly w-[100%]">
				<div>
					<img className='ml-5' width={"300px"} src="/twitternew.png" alt="twitter-logo" />
				</div>

				<div>
					<div className='my-5'>
						<h2 className='font-bold text-6xl'>Reset Password</h2>
					</div>

					<form className='flex flex-col w-[55%]' onSubmit={ResetPasswordHandler} >
						<Input
							type="text"
							value={newPassword}
							onChange={(e) => setnewPassword(e.target.value)}
							placeholder='Your new password'
							userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
						/>
						<Button
							type="submit"
							children="Reset Password"
							userClassName='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'
						/>
					</form>

				</div>
			</div>
		</section>
	)
}

export default ResetPassword