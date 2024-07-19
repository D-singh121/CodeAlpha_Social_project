import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Post from "./Post";


const Feed = () => {
  const { tweets } = useSelector((store => store.tweet));
  console.log(tweets);

  return (
    <div className="w-[55%] border-x border-gray-300">
      <CreatePost />
      {
        tweets?.length > 0 ? (
          tweets?.map((tweet) => <Post key={tweet?._id} tweetDetails={tweet} />)
        ) : (
          <div className="flex justify-center items-start p-6 opacity-70">
            <h2 className="font-semibold text-2xl ">Sorry !  You don't have any tweets.</h2>
          </div>
        )

      }
    </div>
  )
}

export default Feed;