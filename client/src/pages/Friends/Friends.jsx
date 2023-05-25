import React from "react";
import AllFriend from "../../components/Friends/AllFriend/AllFriend";
import FriendsContainer from "../../components/Friends/FriendsContainer/FriendsContainer";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "./Friend.scss";

const Friends = () => {
  return (
    <>
      <HomeHeader />
      <div className="friend_manage">
        <FriendsContainer />
        <AllFriend />
      </div>
    </>
  );
};

export default Friends;
