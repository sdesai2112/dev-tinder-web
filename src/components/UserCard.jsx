import React from "react";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, gender, about } = user;

  return (
    <div className="mx-auto card bg-base-300 w-[400px] h-[500px] shadow-sm my-[20px]">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
