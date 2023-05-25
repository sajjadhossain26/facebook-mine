import React, { useState } from "react";
import Fbcard from "../../FbCard/Fbcard";
import { useSelector } from "react-redux";

const ProfilePhotos = () => {
  const { user, users } = useSelector((state) => state.auth);
  return (
    <Fbcard>
      <div className="personal-photo">
        <div className="all-photos-btn">
          <a className="text-bold" href="">
            Photos
          </a>
          <a href="" className="personal-info-all">
            See All Photos
          </a>
        </div>
        <div className="photo-gallery photo">
          {user.posts.map((item, index) => (
            <div className="photo-item" key={index}>
              {item.postImage === [] ? (
                ""
              ) : (
                <img src={`/post/${item.postImage}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Fbcard>
  );
};

export default ProfilePhotos;
