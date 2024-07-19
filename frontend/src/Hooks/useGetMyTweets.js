import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_URL_POINT } from "../Utils/Constant"
import { useDispatch, useSelector } from "react-redux"

import { getAllTweets } from "../Redux/tweetSlice"
// import { setLoading } from "../Redux/userSlice"


const useGetMyTweets = (id) => {
	const dispatch = useDispatch();
	const { refresh, isActive } = useSelector(state => state.tweet); // this will call or refresh the feed tweets when new tweet will'be there.

	const fetchMyTweets = async () => {
		// dispatch(setLoading(true))
		try {
			const res = await axios.get(`${TWEET_API_URL_POINT}/alltweets/${id}`, {
				withCredentials: true
			})
			// console.log(res);
			dispatch(getAllTweets(res.data.tweets))
		} catch (error) {
			console.log(error);

		}
		//  finally {
		// 	dispatch(setLoading(false))
		// }
	}

	// fetchinng all following users tweets ..
	const handleFollowingUsersTweet = async () => {
		try {
			axios.defaults.withCredentials = true;
			const res = await axios.get(`${TWEET_API_URL_POINT}/followingtweets/${id}`);
			// console.log(res);
			dispatch(getAllTweets(res.data.tweets));
		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {
		if (isActive) {
			fetchMyTweets();
		} else {
			handleFollowingUsersTweet();
		}
	}, [refresh, isActive])
}

export default useGetMyTweets;