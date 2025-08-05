import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests", {
      withCredentials: true,
    });

    console.log(res?.data?.connectionRequests);
    dispatch(addRequests(res?.data?.connectionRequests));
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res?.data);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    requests?.length > 0 && (
      <div className="text-center my-10">
        <h1 className="font-bold text-2xl">Connections</h1>
        {requests.map((request) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;
          return (
            <div
              key={request?._id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              <div>
                <img
                  alt="photo"
                  className="w-[50px] h-[50x] rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-10">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    reviewRequests("rejected", request?._id);
                  }}
                  className="btn btn-primary mx-2"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    reviewRequests("accepted", request?._id);
                  }}
                  className="btn btn-secondary mx-2"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Requests;
