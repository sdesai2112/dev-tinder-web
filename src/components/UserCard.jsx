import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;
  const { photoUrl, firstName, lastName, age, gender, about, _id } = user;

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
      if (err?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div
      className={`mx-auto card bg-base-300 w-[400px] shadow-sm ${
        isEdit ? " h-[470px]" : " h-[550px] my-[20px]"
      }`}
    >
      <div className="card-body">
        {photoUrl && (
          <figure>
            <img className="h-[255px]" src={photoUrl} alt="Image" />
          </figure>
        )}
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <div>{age + ", " + gender?.toUpperCase()}</div>}
        {about && (
          <div className="relative group inline-block">
            <p>
              {about.length > 137 ? about?.substring(0, 137) + "..." : about}
            </p>
            {about.length > 137 && (
              <div className="absolute bottom-full mb-2 hidden max-w-xs rounded-lg bg-base-content px-3 py-2 text-sm text-base-100 shadow-lg group-hover:block break-words whitespace-pre-line z-10">
                {about}
              </div>
            )}
          </div>
        )}
        {!isEdit && (
          <div className="card-actions justify-center my-auto">
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
        )}
      </div>
    </div>
  );
};

export default UserCard;
