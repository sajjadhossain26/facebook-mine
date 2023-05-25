import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsers } from "../../../redux/auth/authAction";
import FriendBox from "../FriendBox/FriendBox";
import FriendsContainer from "../FriendsContainer/FriendsContainer";
import HomeHeader from "../../HomeHeader/HomeHeader";

const FriendRequest = () => {
  const { users, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers(user._id));
  }, []);

  return (
    <>
      <HomeHeader />
      <FriendsContainer />
      <div className="all_friend">
        <div className="all_friend_wrap">
          <div className="friend_title">
            <h1>Friend Requested</h1>
            <span>See All</span>
          </div>

          <div className="All_friend-box">
            {users.map((item, index) => {
              if (user.request.includes(item._id)) {
                return (
                  <Link to="" key={index}>
                    <FriendBox user={item} buttonState="request" />
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
