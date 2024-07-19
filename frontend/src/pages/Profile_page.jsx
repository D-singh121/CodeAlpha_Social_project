import { MdOutlineVerifiedUser } from "react-icons/md";
import { PiCalendarDotsDuotone } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { Link, useParams } from 'react-router-dom'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { Button } from '../components';
import useGetProfile from "../Hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_URL_POINT } from "../Utils/Constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../Redux/userSlice";
import { getRefresh } from "../Redux/tweetSlice";

const Profile_page = () => {
	const { profile, loggedInUser } = useSelector((state) => state.user) // bringing from store

	const { id } = useParams();
	useGetProfile(id);

	const dispatch = useDispatch();

	const followAndUnfollowHandler = async () => {
		if (loggedInUser?.following.includes(id)) {
			// Already following then unfollow
			try {
				const res = await axios.post(`${USER_API_URL_POINT}/unfollow/${id}`, { id: loggedInUser?._id }, {
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true,
				})
				dispatch(followingUpdate(id))
				dispatch(getRefresh());

				console.log(res);
				toast.success(res.data.message)
			} catch (error) {
				console.log(error);
				toast.success(error.res.data.message)
			}
		} else {
			// follow to user
			try {
				const res = await axios.post(`${USER_API_URL_POINT}/follow/${id}`, { id: loggedInUser?._id }, {
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true,
				})
				dispatch(followingUpdate(id))
				dispatch(getRefresh());
				console.log(res);
				toast.success(res.data.message)
			} catch (error) {
				console.log(error);
				toast.success(error.res.data.message)
			}
		}
	}


	return (
		<section className='w-[55%]'>
			<div className='w-[100%]  border-x border-gray-200'>
				<div>
					<div className='flex items-center py-2'>
						<Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
							<IoMdArrowBack size="24px" />
						</Link>
						<div className='ml-2'>
							<h1 className='font-bold text-lg'>{profile?.name}</h1>
							<p className='text-gray-500 text-sm'>59 post</p>
						</div>
					</div>

					<div>
						<img src="https://pbs.twimg.com/profile_banners/1666796553628192776/1720556153/600x200" alt="banner" width='100%' />
					</div>

					<div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
						<Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
					</div>
					<div className='text-right m-4'>
						{
							profile?._id === loggedInUser._id ? (
								<Button
									children="Edit Profile"
									textColor='black opacity-90'
									userClassName="px-4 py-1 text-xs font-black hover:bg-gray-200 rounded-full border border-gray-400 "
								/>
							) : (
								<Button
									onClick={followAndUnfollowHandler}
									children={loggedInUser.following.includes(id) ? "Unfollow" : "Follow"}
									textColor='black opacity-90'
									userClassName="px-4 py-1 text-xs font-black hover:bg-gray-200 rounded-full border border-gray-400 "
								/>
							)
						}
					</div>
					<div className='m-4'>
						<h1 className='font-bold text-xl'>{profile?.name}</h1>
						<p className='opacity-80'>{`@${profile?.userName}`}</p>
					</div>
					<div className='m-4 text-sm'>
						<p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
					</div>
					<div className="flex justify-start items-center m-4 gap-6 opacity-70">
						<div className="flex justify-between items-center gap-2">
							<SlLocationPin />
							<span>India</span>
						</div>

						<div className="flex justify-between items-center gap-2">
							<PiCalendarDotsDuotone />
							<span>Joined June 2024</span>
						</div>

						<div className="flex justify-between items-center gap-2">
							<MdOutlineVerifiedUser />
							<span>Verified phone number</span>
						</div>
					</div>

					<div className="flex justify-start gap-4 m-4">
						<div className="flex justify-between gap-1 items-center">
							<h1 className="font-semibold">124</h1>
							<span className="opacity-70">Following</span>
						</div>
						<div className="flex justify-between gap-1 items-center">
							<h1 className="font-semibold">114</h1>
							<span className="opacity-60"> Followers</span>
						</div>

					</div>
				</div>
			</div>
		</section>)
}

export default Profile_page;