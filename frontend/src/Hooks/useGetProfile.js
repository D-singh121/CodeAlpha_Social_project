import { useEffect } from 'react';
import axios from 'axios';
import { USER_API_URL_POINT } from '../Utils/Constant';
import { useDispatch } from "react-redux"

import { getMyProfile } from '../Redux/userSlice'; // from redux store slice

const useGetProfile = (id) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchMyProfile = async () => {
			try {
				const resProfile = await axios.get(`${USER_API_URL_POINT}/profile/${id}`, {
					withCredentials: true
				});
				// console.log(resProfile);
				dispatch(getMyProfile(resProfile.data.user));

			} catch (error) {
				console.log(error);
			}
		}
		fetchMyProfile();
	}, [id]);
};
export default useGetProfile;