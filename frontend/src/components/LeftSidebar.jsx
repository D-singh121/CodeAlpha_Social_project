import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button } from './index.js';
import toast from 'react-hot-toast';

import { GoHome, GoPeople } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { USER_API_URL_POINT } from '../Utils/Constant';
import { useDispatch, useSelector } from 'react-redux';

import { getLoggedUser, getOtherUsers, getMyProfile, } from '../Redux/userSlice.js';


const LeftSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector(store => store.user)
  // console.log(loggedInUser._id);

  const logoutHandler = async () => {
    if (!loggedInUser) {
      // If user is not present, do nothing or handle the case accordingly
      console.log("you are not logged in currently !.");
      return;
    }

    // dispatch(setLoading(true))
    try {
      const logoutRes = await axios.get(`${USER_API_URL_POINT}/logout`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(logoutRes.data.message);
      dispatch(getLoggedUser(null)); // after logout user will be null
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      // console.log(res);
    } catch (error) {
      // console.log(error);
      toast.success(error.data.message);
    } 
    // finally {
    //   dispatch(setLoading(false))
    // }
  }


  return (
    <>
      <section className=" flex flex-col justify-start gap-2 max-w-[20%] h-[100%] my-auto overflow-hidden">
        {/* logo */}
        <div className="logo py-2 mt-2 px-4 hover:bg-gray-200 hover:cursor-pointer rounded-full">
          <Link to='/' className='flex items-center  '>
            <figure className='w-7 font-bold '>
              <img src="../../public/twitternew.png" alt="Twitter_logo" />
            </figure>
          </Link>
        </div>

        {/*menu  */}
        <ul className='flex flex-col w-full'>
          <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <GoHome className='text-2xl' />
            </div>
            <h1 className='text-2xl opacity-80 ml-5'>Home</h1>
          </Link>

          <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoSearchOutline className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5'>Explore</h1>
          </Link>

          <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoNotificationsOutline className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5'>Notifications</h1>
          </Link>

          <Link to="/bookmarks" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoBookmarkOutline className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5'>Bookmarks</h1>
          </Link>

          <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <GoPeople className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5'>Communities</h1>
          </Link>

          <Link to={`/profile/${loggedInUser?._id}`} className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <CgProfile className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5'>Profile</h1>
          </Link>

          <Link to="" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoMdLogOut className='text-2xl' />
            </div>
            <h1 className=' text-2xl opacity-80 ml-5' onClick={() => logoutHandler()} >Logout</h1>
          </Link>

          <Button
            children='Post'
            userClassName=' mt-5 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'
          />


        </ul>


        {/* profile */}
        <div className='flex justify-between items-center border border-slate-300 hover:bg-slate-100 cursor-pointer rounded-full py-2 px-2 mt-20'>
          <div className='w-10 rounded-full cursor-pointer'>
            <img src='../../public/my_image.png' alt='profile_pic' className='w-full rounded-full ml ' />
          </div>
          <Link to={`/profile/${loggedInUser?._id}`}>
            <div className='cursor-pointer'>
              <h1 className='text-sm font-bold'>{loggedInUser?.name}</h1>
              <h2 className='text-sm opacity-80'>{loggedInUser?.userName}</h2>
            </div>
          </Link>
          <div>
            <MdOutlineMoreHoriz className='text-lg' />
          </div>
        </div>

      </section>
    </>
  )

}

export default LeftSidebar;