import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      if (feedData) return;
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };
  return (
    <div>
      {console.log(feedData)}
      {feedData && <UserCard key={feedData[0]?._id} user={feedData[0]} />}
    </div>
  );
};

export default Feed;
