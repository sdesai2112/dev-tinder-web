import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.connections);
      dispatch(addConnections(res?.data?.connections));
    } catch (err) {
      console.log(err);
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
            <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
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
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
