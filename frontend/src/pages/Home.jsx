import { Outlet, useNavigate } from "react-router-dom";
import { LeftSidebar, RightSidebar } from "../components"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetMyTweets from "../Hooks/useGetMyTweets";

const Home = () => {

	const navigate = useNavigate();

	const { loggedInUser } = useSelector(store => store.user)
	useEffect(() => {
		!loggedInUser
			? (navigate("/login"))
			: (navigate("/"))
	}, [])

	useGetMyTweets(loggedInUser?._id) // fetching all tweets from store 

	return (
		<>
			<section className='flex justify-between h-[100vh] w-[90%] mx-auto relative '>
				<LeftSidebar />
				<Outlet />
				<RightSidebar />
			</section>
		</>
	)
}

export default Home;	