import { Link } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";




const LeftSidebar = () => {
  return (
    <>
      <section className="sidebar flex flex-col justify-between gap-2">
        {/* logo */}
        <div className="logo py-2 mt-2 px-4 hover:bg-gray-200 hover:cursor-pointer rounded-full">
          <Link to='/' className='flex items-center  '>
            <figure className='w-7 font-bold '>
              <img src="../../public/twitternew.png" alt="Twitter_logo" />
            </figure>
          </Link>
        </div>

        {/*menu  */}
        <div>
          <ul>
            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <GoHome className='text-2xl' />
              </div>
              <h1 className='text-2xl ml-3'>Home</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <IoSearchOutline className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>Explore</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <IoNotificationsOutline className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>Notifications</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <MdOutlineLocalPostOffice className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>Messages</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <GoPeople className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>Communities</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <CgProfile className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>Profile</h1>
            </Link>

            <Link to="/" className='flex items-center my-0 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
              <div>
                <CgMoreO className='text-2xl' />
              </div>
              <h1 className=' text-2xl ml-3'>More</h1>
            </Link>

          </ul>
        </div>
      </section>
    </>
  )

}

export default LeftSidebar