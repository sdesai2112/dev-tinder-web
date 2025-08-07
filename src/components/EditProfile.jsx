import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      },
      { withCredentials: true }
    );

    console.log(res);
    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex">
        <div className="mx-auto card bg-base-300 w-[400px] h-[450px] shadow-sm my-[20px]">
          <div className="card-body">
            <div className="mt-[5px]">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  title="Only letters, numbers or dash"
                />
              </label>
              {/* <p className="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p> */}
            </div>
            <div className="mt-[5px]">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  title="Only letters, numbers or dash"
                />
              </label>
              {/* <p className="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p> */}
            </div>
            <div className="mt-[5px]">
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                list="gender"
              />
              <datalist id="gender">
                <option value="male"></option>
                <option value="female"></option>
                <option value="others"></option>
              </datalist>
            </div>
            <div className="mt-[5px]">
              <input
                type="number"
                className="input validator"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Type a Age"
                min="1"
                max="100"
                title="Must be between be 1 to 100"
              />
              {/* <p className="validator-hint">Age</p> */}
            </div>
            <div className="mt-[5px]">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </g>
                </svg>
                <input
                  type="url"
                  required
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                  placeholder="https://"
                  pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                  title="Must be valid URL"
                />
              </label>
              {/* <p className="validator-hint">Must be valid URL</p> */}
            </div>
            <div className="mt-[5px]">
              <input
                type="text"
                placeholder="Type about yourself"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="mx-auto mt-[15px]">
              <button
                className="btn btn-active btn-primary"
                onClick={handleSignUp}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
