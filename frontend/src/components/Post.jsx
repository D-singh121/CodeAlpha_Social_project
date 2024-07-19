import { CiShare2 } from "react-icons/ci";
import { IoBookmarkOutline } from "react-icons/io5";
import { TbAntennaBars4 } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";
import { RiMoreFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

import Avatar from 'react-avatar';
import axios from 'axios';
import { TWEET_API_URL_POINT } from '../Utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from "../Redux/tweetSlice";


const Post = ({ tweetDetails }) => {

  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(store => store.user);

  // Like and dislike handler
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(`${TWEET_API_URL_POINT}/like/${id}`, { id: loggedInUser?._id }, {
        withCredentials: true
      });
      console.log(res);
      dispatch(getRefresh()); // to update in UI sections
      toast.success(res.data.message);

    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  }


  return (
    <>
      <section className="p-2 border-b border-gray-200 cursor-pointer hover:bg-[#f7f8fa]">
        <div className="flex justify-between  w-full">
          {/* logo image */}
          <div className="mx-2 mt-2 cursor-pointer">
            <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
          </div>

          <div className="flex flex-col w-[100%]">
            {/* name and id */}
            <div className="flex  justify-between  flex-row w-full items-center" >
              <div className="flex gap-2 justify-center items-center" >
                <strong>{tweetDetails?.userDetails[0]?.name}</strong>
                <span className="text-[#1d9bf0] ">
                  <MdVerified size='18px' />
                </span>
                <span className="opacity-50">@Twitter_ID</span>
                <span className="opacity-50">.1h</span>
              </div>

              <div className="p-2 opacity-80 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                <RiMoreFill size='22px' />
              </div>
            </div>

            {/* post text */}
            <div className="opacity-80">{tweetDetails?.description}</div>

            {/* like,comment and share icons */}
            <div className="flex justify-between">
              <div className="flex justify-between items-center ml-[-10px] hover:text-[#1d9bf0]">
                <div className="p-2 opacity-80 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                  <TfiCommentAlt size='18px' />
                </div>
                <span className="text-sm opacity-60">10K</span>
              </div>

              <div className="flex justify-between items-center hover:text-[#1d9bf0]">
                <div className="p-2 opacity-60 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                  <BiRepost size='20px' />
                </div>
                <span className="text-sm opacity-60">1M</span>
              </div>

              <div className="flex justify-between items-center hover:text-[#f50090]">
                <div onClick={() => likeOrDislikeHandler(tweetDetails._id)} className="p-2 opacity-80 cursor-pointer hover:bg-[#f2b1d7] border-none rounded-full" >
                  <IoMdHeartEmpty size='18px' />
                </div>
                <span className="text-sm opacity-60">{tweetDetails?.like.length}</span>
              </div>

              <div className="flex justify-between items-center hover:text-[#1d9bf0]">
                <div className="p-2 opacity-80 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                  <TbAntennaBars4 size='24px' />
                </div>
                <span className="text-sm opacity-60">1M</span>
              </div>

              <div className="flex">
                <div className="flex justify-between items-center hover:text-[#1d9bf0]">
                  <div className="p-2 opacity-80 cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                    <IoBookmarkOutline size='18px' />
                  </div>

                </div>

                <div className="flex justify-between items-center hover:text-[#1d9bf0]">
                  <div className="p-2 opacity-100 font-semibold cursor-pointer hover:bg-[#d5efff] border-none rounded-full" >
                    <CiShare2 size='18px' />
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Post;