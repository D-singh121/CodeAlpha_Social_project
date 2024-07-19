import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_URL_POINT } from "../Utils/Constant"
import { useDispatch, useSelector } from "react-redux"

import { getAllTweets } from "../Redux/tweetSlice"
import { setLoading } from "../Redux/userSlice"
import toast from "react-hot-toast"


const useGetMyTweets = (id) => {
	const dispatch = useDispatch();

	const { refresh } = useSelector(state => state.tweet); // this will call or refresh the feed tweets when new tweet will'be there.
	useEffect(() => {
		const fetchMyTweets = async () => {
			dispatch(setLoading(true))
			try {
				const res = await axios.get(`${TWEET_API_URL_POINT}/alltweets/${id}`, {
					withCredentials: true
				})
				// console.log(res);
				dispatch(getAllTweets(res.data.tweets))
			} catch (error) {
				console.log(error);
				toast.success.error.data.message
			} finally {
				dispatch(setLoading(false))
			}
		}
		fetchMyTweets();
	}, [refresh])
}

export default useGetMyTweets;