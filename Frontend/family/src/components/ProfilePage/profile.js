import React from "react";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const { userId } = useParams();
  return <div>this is my profile</div>;
};

export default UserProfile;
