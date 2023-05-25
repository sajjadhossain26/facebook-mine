import React from "react";
import "./FriendsContainer.scss";
import { Link } from "react-router-dom";

const FriendsContainer = () => {
  return (
    <>
      <div className="friends_container">
        <div className="friends_container_wrap">
          <div className="friends_container_title">
            <h1>Friends</h1>
            <i class="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div className="friends_menu_list">
            <ul>
              <li>
                <a href="#">
                  <div className="friends_menu">
                    <i class="fa-solid fa-user-group"></i>
                    <span>Home</span>
                  </div>
                </a>
              </li>
              <li>
                <Link to="/friend-request">
                  <div className="friends_menu">
                    <i class="fa-solid fa-user-minus"></i>
                    <span>Friend Requests</span>
                  </div>
                  <div className="friends_arrow">
                    <i class="fa-solid fa-angle-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <a href="#">
                  <div className="friends_menu">
                    <i class="fa-solid fa-user-plus"></i>
                    <span>Suggestion</span>
                  </div>
                  <div className="friends_arrow">
                    <i class="fa-solid fa-angle-right"></i>
                  </div>
                </a>
              </li>
              <li>
                <Link to="/friends">
                  <div className="friends_menu">
                    <i class="fa-solid fa-users"></i>
                    <span>All Friends</span>
                  </div>
                  <div className="friends_arrow">
                    <i class="fa-solid fa-angle-right"></i>
                  </div>
                </Link>
              </li>
              <li>
                <a href="#">
                  <div className="friends_menu">
                    <i class="fa-solid fa-users"></i>
                    <span>Home</span>
                  </div>
                  <div className="friends_arrow">
                    <i class="fa-solid fa-angle-right"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsContainer;
