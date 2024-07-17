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
        tweets?.map((tweet) => <Post key={tweet?._id} tweetDetails={tweet} />)
      }
    </div>
  )
}

export default Feed;
