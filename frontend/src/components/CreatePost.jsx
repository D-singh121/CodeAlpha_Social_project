import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaPollHSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { Button } from './index.js'

const CreatePost = () => {
  return (
    <>
      <section className='w-[100%]'>
        {/* following tabs */}
        <div className="w-full">
          <div className='flex items-center cursor-pointer justify-evenly border-b border-gray-200  '>
            <div className="hover:bg-blue-200 w-full text-center px-4 py-2">
              <h1 className='py-1 font-semibold text-gray-600 text-lg opacity-85'>For you</h1>
            </div>
            <div className="hover:bg-blue-200 w-full text-center px-4 py-2" >
              <h1 className='py-1 font-semibold text-gray-600 text-lg opacity-85'>Following</h1>
            </div>
          </div>

          {/* createinput */}
          <div className="w-full" >
            <div className='flex items-center p-4'>
              <div>
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
              </div>
              <input className='w-full outline-none border-none text-xl ml-5' type="text" placeholder='What is happening?!' />
            </div>

            {/* icons */}
            <div className='flex items-center justify-between p-2 border-b border-gray-300'>
              <div className="flex justify-evenly w-[30%] text-[#3094d6] ">
                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full">
                  <CiImageOn size="24px" />
                </div>
                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                  <HiOutlineGif size='24px' />
                </div>

                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full">
                  <BsEmojiSmile size='22px' />
                </div>

                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full">
                  <LiaPollHSolid size='25px' />
                </div>

                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full">
                  <IoCalendarOutline size="24px" />
                </div>

                <div className="p-2 cursor-pointer hover:bg-[#d5efff] border-none rounded-full">
                  <SlLocationPin size='22px' />
                </div>

              </div>
              <Button
                children='Post'
                userClassName='bg-[#1D9BF0] px-6 py-1 text-lg text-white text-right border-none rounded-full '
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default CreatePost

