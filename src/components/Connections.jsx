import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.connections));
    } catch (err) {
      console.log(err);
      if (err?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    connections?.length > 0 && (
      <div className="text-center my-10">
        <h1 className="font-bold text-2xl">Connections</h1>
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            connection;
          return (
            <div className="bg-base-300 w-[700px] mx-auto grid grid-cols-4 gap-4 mt-[6px]">
              <div className="w-[200px] h-[200px]">
                <img
                  alt="photo"
                  className="col-span-1 rounded-full w-[150px] h-[150px] block ml-[25px] mt-[25px] object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="col-span-3 text-left m-[25px]">
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
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
