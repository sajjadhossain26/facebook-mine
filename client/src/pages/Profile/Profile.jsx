import React from "react";

import HomeHeader from "../../components/HomeHeader/HomeHeader";
import ProfileFriends from "../../components/Profile/ProfileFriends/ProfileFriends";
import ProfileIntro from "../../components/Profile/ProfileIntro/ProfileIntro";
import ProfilePhotos from "../../components/Profile/ProfilePhotos/ProfilePhotos";
import TimeLine from "../../components/TimeLine/TimeLine";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import "./Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <HomeHeader />
      <ProfileHeader />
      <div className="fb-profile-body">
        <div className="user-profile-personal-info">
          <div className="left-personal-info">
            <ProfileIntro />
            <ProfilePhotos />
            <ProfileFriends />
          </div>
          <div className="right-personal-info">
            <TimeLine />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
