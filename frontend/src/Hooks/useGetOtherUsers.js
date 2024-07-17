import { useDispatch } from "react-redux";
import { setLoading } from "../Redux/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_URL_POINT } from "../Utils/Constant";

import { getOtherUsers } from "../Redux/userSlice.js"

const useGetOtherUsers = (id) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const otherUsers = async () => {
			dispatch(setLoading(true))
			try {
				const res = await axios.get(`${USER_API_URL_POINT}/otheruser/${id}`, {
					withCredentials: true
				})
				dispatch(getOtherUsers(res.data.otherUsers))

			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false))
			}
		}

		otherUsers();
	}, [])

}

export default useGetOtherUsers;