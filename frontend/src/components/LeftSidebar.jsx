import { Link } from 'react-router-dom'
import { GoHome, GoPeople } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice, MdOutlineMoreHoriz } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import Button from './Button';




const LeftSidebar = () => {
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

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <MdOutlineLocalPostOffice className='text-2xl' />
              </div>
              <h1 className=' text-2xl opacity-80 ml-5'>Messages</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <GoPeople className='text-2xl' />
              </div>
              <h1 className=' text-2xl opacity-80 ml-5'>Communities</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <CgProfile className='text-2xl' />
              </div>
              <h1 className=' text-2xl opacity-80 ml-5'>Profile</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <IoMdLogOut className='text-2xl' />
              </div>
              <h1 className=' text-2xl opacity-80 ml-5'>Logout</h1>
            </Link>

            <Button
              children='Post'
              userClassName=' mt-5 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'
            />


          </ul>
        

        {/* profile */}
        <div className='flex justify-between items-center  hover:bg-slate-200 cursor-pointer rounded-full py-2 px-2 mt-20'>
          <div className='w-10 rounded-full cursor-pointer'>
            <img src='../../public/my_image.png' alt='profile_pic' className='w-full rounded-full ml ' />
          </div>

          <Link to="/profile/:id">
            <div className='cursor-pointer'>
              <h1 className='text-sm font-bold'>Devesh Choudhary</h1>
              <h2 className='text-sm opacity-80'>@Dee_singh</h2>
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

export default LeftSidebar