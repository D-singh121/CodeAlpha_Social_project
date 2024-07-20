import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_URL_POINT } from "../Utils/Constant";


const ForgetPassword = () => {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const getForgetRecoveryEmail = async (e) => {
		e.preventDefault();
		try {
			const recoveryEmail = { email }
			// console.log(recoveryEmailmail);
			const res = await axios.post(`${USER_API_URL_POINT}/forgotPass`, recoveryEmail);

			if (res.status === 200) {
				navigate("/login")
			} else {
				console.log("Invalid email! ", res.data);
			}
			toast.success(res.data.message, { position: "top-right" });
			console.log(res);
		} catch (error) {
			toast.error(error.response.data.message, { position: "top-right" })
			console.log(error);
		}
		setEmail("")
	}

	return (
		<section className="w-screen h-screen flex items-center justify-center'">
			<div className="flex items-center justify-evenly w-[100%]">
				<div>
					<img className='ml-5' width={"300px"} src="/twitternew.png" alt="twitter-logo" />
				</div>

				<div>
					<div className='my-5'>
						<h2 className='font-bold text-6xl'>Forget Password</h2>
					</div>

					<form className='flex flex-col w-[55%]' onSubmit={getForgetRecoveryEmail} >
						<Input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Type Email'
							userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
						/>
						<Button
							type="submit"
							children="Submit"
							userClassName='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'
						/>
						<Link to="/login">
							<div className="flex justify-center items-center gap-4" >
								<span><AiOutlineHome className="font-bold text-blue-600" size="19px" /></span>
								<h1 className="text-blue-600 font-semibold text-center hover:underline">Go back to Signup page !</h1>
							</div>
						</Link>
					</form>

				</div>
			</div>
		</section>
	)
}

export default ForgetPassword;