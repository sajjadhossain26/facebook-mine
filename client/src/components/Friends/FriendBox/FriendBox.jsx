import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, confirmFriend } from "../../../redux/auth/authAction";
import createToast from "../../../utility/toast";
import "./FriendBox.scss";

const FriendBox = ({ user, buttonState }) => {
  const { user: sender } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddFriend = (receiverId) => {
    dispatch(addFriend(receiverId, sender));
  };
  const handleConfirmFriend = (receiverId) => {
    dispatch(confirmFriend(sender, receiverId));
  };
  if (user) {
    return (
      <>
        <div className="friend_box">
          <div className="friend_box_wrap">
            <div className="friend_item">
              <img
                src={
                  user.profile_photo
                    ? `/profile/${user.profile_photo}`
                    : "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"
                }
                alt=""
              />
              <h3>
                {user.first_name} {user.sur_name}
              </h3>
              <div className="mutual_friend">
                <img
                  src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-1/334670861_597425885626495_6726043637700307267_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=f67be1&_nc_eui2=AeG0Hh1kB09cxMeC6jeb92RbOE8YN93JrXU4Txg33cmtddVFAreNel2QuAWH9Ihoe9k1EfNNgtPgu6j0ml2b-9ne&_nc_ohc=0c7XM8EarwoAX-d5iGn&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfABg1pylNocg2o6SkVpOzrZHz-Do9JJJRPkPJDfxvFOSA&oe=6462E455"
                  alt=""
                />
                <img
                  src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/308633714_101055166114313_6968598364736520497_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGbBblEx23dmoXY1i2TuUODzPPpUAquJ-XM8-lQCq4n5dGYwGHvAZfpElfQYs1hToTauH-8yTpJ51-qyB_VuFPh&_nc_ohc=_qms7flPfHAAX-Kz8sr&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfCNB5zhkw9bBdXYHZiGROUw8DEZCo6BMUWfyMVuc-gLRw&oe=64621FD5"
                  alt=""
                />

                <span>54 mutual friends</span>
              </div>
              <div className="action_button">
                {buttonState === "request" && (
                  <>
                    <button
                      className="blue_btn full"
                      onClick={() => handleConfirmFriend(user._id)}
                    >
                      Confirm
                    </button>
                    <button className="gray_btn full">Delete</button>
                  </>
                )}
                {buttonState === "mayknow" && (
                  <>
                    <button
                      className="blue_2 full"
                      onClick={() => handleAddFriend(user._id)}
                    >
                      Add Friend
                    </button>
                    <button className="gray_btn full">Cancel</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default FriendBox;
