import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { photoUrl, firstName, lastName, age, gender, about, _id } = user;

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      console.log(res?.data);
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto card bg-base-300 w-[400px] h-[450px] shadow-sm my-[20px]">
      <figure>
        <img className="h-auto" src={photoUrl} alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <div>{age + ", " + gender}</div>}
        {about && <div className="mt-[12px]">{about}</div>}
        <div className="card-actions justify-center mt-[35px]">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
