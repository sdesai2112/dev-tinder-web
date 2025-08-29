import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      console.log(err);
      if (err?.status === 401) {
        navigate("/login");
      }
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
      if (err?.status === 401) {
        navigate("/login");
      }
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
              className="flex items-center rounded-lg bg-base-300 w-[600px] mx-auto mb-[10px]"
            >
              <div className="w-[150px]">
                <img
                  alt="photo"
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-10 col-span-4 w-[300px]">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <div className="relative group inline-block">
                  <p>
                    {about.length > 137
                      ? about?.substring(0, 137) + "..."
                      : about}
                  </p>
                  {about.length > 137 && (
                    <div className="absolute bottom-full mb-2 hidden max-w-xs rounded-lg bg-base-content px-3 py-2 text-sm text-base-100 shadow-lg group-hover:block break-words whitespace-pre-line z-10">
                      {about}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[150px]">
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
                  className="btn btn-secondary mx-2 mt-[10px]"
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
