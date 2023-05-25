import React, { useEffect } from "react";
import Fbcard from "../../FbCard/Fbcard";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../../redux/auth/authAction";
import { Link } from "react-router-dom";

const ProfileFriends = () => {
  const dispatch = useDispatch();

  const { users, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(allUsers(user._id));
  }, []);

  return (
    <Fbcard>
      <div className="personal-photo">
        <div className="all-photos-btn">
          <a className="text-bold" href="">
            Friends
          </a>
          <a href="" className="personal-info-all">
            See All Friends
          </a>
        </div>
        <div className="friend-gallery">
          {users.map((item, index) => {
            if (user.friends.includes(item._id)) {
              return (
                <div className="friends-item">
                  <Link to="/friends">
                    <img src={`/profile/${user.profile_photo}`} />
                    <span>Sajjad Hossain</span>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Fbcard>
  );
};

export default ProfileFriends;
