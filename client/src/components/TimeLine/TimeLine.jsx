import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePopupClose from "../../hooks/usePopupClose";
import Avatar from "../Avatar/Avatar";
import FbModal from "../FbModal/FbModal";
import "./Timeline.css";
import { allUsers, postUpdate } from "../../redux/auth/authAction";
import { useLocation, useParams } from "react-router-dom";

const TimeLine = ({ title, photo }) => {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const [post, setPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postPhoto, setPostPhoto] = useState([]);
  const [postChecked, setPostChecked] = useState([]);

  const [userMenu, setUserMenu] = useState(false);
  const postManage = useRef(null);
  const location = useLocation();
  usePopupClose(postManage, setUserMenu);

  const handlePostPhoto = (e) => {
    setPostPhoto((prev) => [...prev, ...Array.from(e.target.files)]);
    setPostChecked((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handlePrevChange = (e) => {
    const updateList = [...postChecked];
    let val = postPhoto.find((data) => data.name === e.target.value);
    console.log("val;", val);
    if (updateList.includes(val)) {
      updateList.splice(updateList.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setPostChecked(updateList);
  };
  const handlePostSave = () => {
    const data = new FormData();
    data.append("postTitle", postTitle);
    postChecked.forEach((item) => {
      data.append("post", item);
    });
    dispatch(postUpdate(data, user._id));

    setPostChecked([]);
    setPostTitle("");
    setPost(false);
  };

  const allpost = user.posts;
  const reverse = allpost.slice().reverse();

  // dispatch(allUsers(user._id));

  // useEffect(() => {
  //   dispatch(allUsers(user._id));
  // }, [users.posts]);

  return (
    <>
      <div className="fb-home-timeline-area">
        <div className="fb-home-timeline">
          <div className="create-post">
            <div className="create-post-header">
              <Avatar />
              <button onClick={() => setPost(!post)}>
                Whats on your mind ?{" "}
              </button>
            </div>
            <div className="divider-0"></div>
            <div className="create-post-footer">
              <ul>
                <li>
                  <div className="post-icon"></div>
                  <span>Live Video</span>
                </li>
                <li>
                  <div className="post-icon"></div> Photo/video
                </li>
                <li>
                  <div className="post-icon"></div> Feeling/ctivity
                </li>
              </ul>
            </div>
          </div>
          {post && (
            <FbModal title="Create post" closePopUp={setPost}>
              <div className="edit-featured-wrap">
                <div className="user-post-header">
                  <div className="post-info">
                    <Avatar />
                    <div className="user-details">
                      <a className="author" href="#">
                        {`${user.first_name} ${user.sur_name}`}
                      </a>
                      <span>
                        {" "}
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          width="1em"
                          height="1em"
                          className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1kpxq89 xsmyaan"
                          title="Shared with Public"
                        >
                          <title>Shared with Public</title>
                          <g
                            fill-rule="evenodd"
                            transform="translate(-448 -544)"
                          >
                            <g>
                              <path
                                d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                fill-rule="nonzero"
                                d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                transform="translate(354 143.5)"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        &nbsp; Public
                      </span>
                    </div>
                  </div>
                </div>

                <div className="post-text">
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder={`What's on your mind ${user.first_name}?`}
                  />
                </div>
                <div className="upload-featured-prev featured-upload">
                  {postPhoto.map((data, index) => {
                    const prevUrl = URL.createObjectURL(data);
                    return (
                      <>
                        <div className="prev-item post" key={index}>
                          <label htmlFor={`checkbox-${index}`}>
                            <img src={prevUrl} alt="" />
                          </label>
                          <div className="round">
                            <input
                              className="check-story"
                              type="checkbox"
                              value={data.name}
                              checked={postChecked.includes(data)}
                              onChange={handlePrevChange}
                              id={`checkbox-${index}`}
                            />
                            <label htmlFor={`checkbox-${index}`}></label>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <br />

                <div className="upload-featured-photos">
                  <label htmlFor="upload-featured-photos">Upload Photos</label>
                  <input
                    onChange={handlePostPhoto}
                    type="file"
                    multiple={true}
                    id="upload-featured-photos"
                    style={{ display: "none" }}
                  />
                </div>

                <div className="upload-featured-prev featured-upload"></div>
                <div className="details-modal-footer">
                  <br />
                  <div className="update-btns">
                    <button className="post-button" onClick={handlePostSave}>
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </FbModal>
          )}

          {reverse.map((item, index) => (
            <>
              <div className="user-post" key={index}>
                <div className="user-post-header">
                  <div className="post-info">
                    <Avatar />

                    <div className="user-details">
                      {user.first_name} {user.sur_name}
                      <span>
                        1m{" "}
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          width="1em"
                          height="1em"
                          className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1kpxq89 xsmyaan"
                          title="Shared with Public"
                        >
                          <title>Shared with Public</title>
                          <g
                            fill-rule="evenodd"
                            transform="translate(-448 -544)"
                          >
                            <g>
                              <path
                                d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                                transform="translate(354 143.5)"
                              ></path>
                              <path
                                fill-rule="nonzero"
                                d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                transform="translate(354 143.5)"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="post-menu" ref={postManage}>
                    {userMenu && (
                      <div className="post-dropdown-menu">
                        <ul>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Save post</span>
                            </a>
                          </li>
                          <li className="divid"></li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Embeded</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Who can comment on this post ?</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Edit view history</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Turn off notification</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>turn off translation</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Copy link</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Edit post</span>
                            </a>
                          </li>
                          <li className="divid"></li>
                          <li>
                            <a href="#">
                              <div className="menu-icon"></div>
                              <span>Move trash</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                    <button className="user-post-menu-btn">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        width="1em"
                        height="1em"
                        className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"
                        onClick={() => setUserMenu(!userMenu)}
                      >
                        <g fill-rule="evenodd" transform="translate(-446 -350)">
                          <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="post-body" key={index}>
                  <div className="post-content">
                    <p>{item.postTitle}</p>
                  </div>
                  <div className="post-media">
                    <img src={`/post/${item.postImage}`} alt="" />
                  </div>
                  <div className="post-comments">
                    <div className="comments-header">
                      <div className="reaction">
                        <div className="reaction-icon">
                          <ul>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                >
                                  <defs>
                                    <linearGradient
                                      id="a"
                                      x1="50%"
                                      x2="50%"
                                      y1="0%"
                                      y2="100%"
                                    >
                                      <stop offset="0%" stop-color="#FF6680" />
                                      <stop
                                        offset="100%"
                                        stop-color="#E61739"
                                      />
                                    </linearGradient>
                                    <filter
                                      id="c"
                                      width="118.8%"
                                      height="118.8%"
                                      x="-9.4%"
                                      y="-9.4%"
                                      filterUnits="objectBoundingBox"
                                    >
                                      <feGaussianBlur
                                        in="SourceAlpha"
                                        result="shadowBlurInner1"
                                        stdDeviation="1"
                                      />
                                      <feOffset
                                        dy="-1"
                                        in="shadowBlurInner1"
                                        result="shadowOffsetInner1"
                                      />
                                      <feComposite
                                        in="shadowOffsetInner1"
                                        in2="SourceAlpha"
                                        k2="-1"
                                        k3="1"
                                        operator="arithmetic"
                                        result="shadowInnerInner1"
                                      />
                                      <feColorMatrix
                                        in="shadowInnerInner1"
                                        values="0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0"
                                      />
                                    </filter>
                                    <path
                                      id="b"
                                      d="M8 0a8 8 0 100 16A8 8 0 008 0z"
                                    />
                                  </defs>
                                  <g fill="none">
                                    <use fill="black" filter="url(#c)" />
                                    <path
                                      fill="white"
                                      d="M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                >
                                  <defs>
                                    <linearGradient
                                      id="a"
                                      x1="50%"
                                      x2="50%"
                                      y1="0%"
                                      y2="100%"
                                    >
                                      <stop offset="0%" stop-color="#18AFFF" />
                                      <stop
                                        offset="100%"
                                        stop-color="#0062DF"
                                      />
                                    </linearGradient>
                                    <filter
                                      id="c"
                                      width="118.8%"
                                      height="118.8%"
                                      x="-9.4%"
                                      y="-9.4%"
                                      filterUnits="objectBoundingBox"
                                    >
                                      <feGaussianBlur
                                        in="SourceAlpha"
                                        result="shadowBlurInner1"
                                        stdDeviation="1"
                                      />
                                      <feOffset
                                        dy="-1"
                                        in="shadowBlurInner1"
                                        result="shadowOffsetInner1"
                                      />
                                      <feComposite
                                        in="shadowOffsetInner1"
                                        in2="SourceAlpha"
                                        k2="-1"
                                        k3="1"
                                        operator="arithmetic"
                                        result="shadowInnerInner1"
                                      />
                                      <feColorMatrix
                                        in="shadowInnerInner1"
                                        values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"
                                      />
                                    </filter>
                                    <path
                                      id="b"
                                      d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"
                                    />
                                  </defs>
                                  <g fill="none">
                                    <path
                                      fill="white"
                                      d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"
                                    />
                                  </g>
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <a href="#">Kajal Datta, Sufia Sepu and 550 others</a>
                      </div>
                      <div className="counts">
                        <a href="#">95 Comments</a>
                      </div>
                    </div>
                    <div className="divider-0"></div>
                    <div className="comments-menu">
                      <ul>
                        <li>
                          <span className="comment-icon"></span>
                          <span>Like</span>
                        </li>

                        <li>
                          <span className="comment-icon"></span>
                          <span>Comment</span>
                        </li>

                        <li>
                          <span className="comment-icon"></span>
                          <span>Share</span>
                        </li>
                      </ul>
                    </div>
                    <div className="divider-0"></div>
                    <div className="comments-area"></div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeLine;
