import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featuredUpdate, profileUpdate } from "../../../redux/auth/authAction";
import Fbcard from "../../FbCard/Fbcard";
import FbModal from "../../FbModal/FbModal";
import PopUpFullWidth from "../../PopUpFullWidth/PopUpFullWidth";
import QuickEdit from "../../QuickEdit/QuickEdit";
import StorySlider from "../../StorySlider/StorySlider";
import featuredImg from "../../../assets/images/featured.png";
import "./ProfileIntro.css";
import follow from "../../../assets/icons/profile.png";
import axios from "axios";
import Draggable from "react-draggable";
import useDraggable from "./useDraggable";

const ProfileIntro = () => {
  // const containerRef = useRef(null);
  // const [isDragging, handleMouseDown, handleMouseUp, handleMouseMove] =
  //   useDraggable(containerRef);
  const { user } = useSelector((state) => state.auth);
  const [fullWidthPopUp, setFullWidthPopUp] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [bio, setBio] = useState("");
  const [saveBtn, setSaveBtn] = useState(true);
  const [remain, setRemain] = useState(user.bio ? 101 - bio.length : "");
  const [modal, setModal] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [featuredUpload, setFeaturedUpload] = useState(false);
  const [featuredChecked, setFeaturedChecked] = useState([]);
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState(false);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [collectionName, setCollectionName] = useState("collection");

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRightButton, setShowRightButton] = useState(true);
  // const [showLeftButton, setShowLeftButton] = useState(false);

  const scrollableRef = useRef(null);

  const [catShow, setCatShow] = useState(false);
  const [cat, setCat] = useState(user.category ? user.category : "");

  const [jobShow, setJobShow] = useState(false);
  const [job, setJob] = useState(user.work ? user.work : []);

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");

  const [eduShow, setEduShow] = useState(false);
  const [study, setStudy] = useState(user.edu ? user.edu : []);
  const [school, setSchool] = useState("");
  const [college, setCollege] = useState("");

  const [adressShow, setAdressShow] = useState(false);
  const [adress, setAdress] = useState("");
  const [adressLivingShow, setAdressLivingShow] = useState(false);
  const [living, setLiving] = useState("");

  const [relationShow, setRelationShow] = useState(false);
  const [relation, setRelation] = useState("");

  const dispatch = useDispatch();

  const handleEditBio = () => {
    setShowBio(!showBio);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
    setRemain(101 - e.target.value.length);
  };

  const handleBioUpdate = (e) => {
    dispatch(profileUpdate({ bio }, user._id, setShowBio));
  };

  const handleCatShow = (e) => {
    e.preventDefault();
    setCatShow(!catShow);
  };

  const handleUpdateCat = (e) => {
    dispatch(profileUpdate({ category: cat }, user._id, setCatShow));
  };

  const handleJobSave = (e) => {
    dispatch(
      profileUpdate(
        { work: [...user.work, { position, company }] },
        user._id,
        setJobShow
      )
    );
  };
  const handleWorkDelete = (company) => {
    const finalwork = user.work.filter((data) => data.company !== company);
    dispatch(profileUpdate({ work: finalwork }, user._id, setJobShow));
  };

  const handleEduSave = (e) => {
    dispatch(
      profileUpdate(
        { edu: [...user.edu, { school, college }] },
        user._id,
        setEduShow
      )
    );
  };

  const handleSchoolDelete = (study) => {
    const finalwork = user.edu.filter((data) => data.school !== study);

    dispatch(profileUpdate({ edu: finalwork }, user._id, setEduShow));
  };

  const handleCollegeDelete = (study) => {
    const finalwork = user.edu.filter((data) => data.college !== study);

    dispatch(profileUpdate({ edu: finalwork }, user._id, setEduShow));
  };

  // Adress handle
  const handleAdressSave = (e) => {
    dispatch(profileUpdate({ home_town: adress }, user._id, setAdressShow));
  };

  const handleAdressLivingSave = (e) => {
    dispatch(profileUpdate({ living: living }, user._id, setAdressLivingShow));
  };

  const handleRelation = (e) => {
    dispatch(
      profileUpdate({ relationship: relation }, user._id, setRelationShow)
    );
  };

  const handleFeaturedUpload = (e) => {
    setFeatured(false);
    setFeaturedUpload(true);
  };
  const handleBack = (e) => {
    setFeatured(true);
    setFeaturedUpload(false);
    setFeaturedPhotos([]);
  };

  const handleFeauterUploadPic = (e) => {
    setFeaturedPhotos((prev) => [...prev, ...Array.from(e.target.files)]);
    setFeaturedChecked((prev) => [...prev, ...Array.from(e.target.files)]);
  };
  const handlePrevChange = (e) => {
    const updateList = [...featuredChecked];
    let val = featuredPhotos.find((data) => data.name === e.target.value);
    if (updateList.includes(val)) {
      updateList.splice(updateList.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setFeaturedChecked(updateList);
  };
  const handleCollection = () => {
    setFeaturedCollection(true);
    if (featuredCollection) {
      setFeaturedUpload(false);
    }
  };
  const handleFeaturedSlider = () => {
    const data = new FormData();
    data.append("collection", collectionName);
    featuredChecked.forEach((item) => {
      data.append("slider", item);
    });

    dispatch(featuredUpdate(data, user._id));
    setFeaturedCollection(false);
    setFeaturedUpload(false);
    setFeaturedPhotos([]);
    setFeaturedChecked([]);
  };

  const handleFeaturedCollection = (e) => {
    e.preventDefault();
    setFeaturedCollection(false);
  };

  const handleFeaturedCancel = () => {
    setFeaturedCollection(false);
    setFeaturedUpload(false);
    setFeaturedPhotos([]);
    setFeaturedChecked([]);
  };

  const handleFeaturedSliderPopUp = (e) => {
    setFullWidthPopUp(true);
    setFeaturedCount(e.target.id);
  };

  const handleOverFlowRight = (direction) => {
    const scrollAmount = 400; // Number of pixels to scroll
    let newScrollPosition;
    if (direction === "right") {
      newScrollPosition = scrollPosition + scrollAmount;
    } else if (direction === "left") {
      newScrollPosition = scrollPosition - scrollAmount;
    }
    setScrollPosition(newScrollPosition);
    scrollableRef.current.scrollLeft = newScrollPosition;
  };

  useEffect(() => {
    // Calculate the maximum scroll position when the component mounts
    const maxScrollPosition =
      scrollableRef.current.scrollWidth - scrollableRef.current.clientWidth;
    if (scrollPosition >= maxScrollPosition) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  }, []);

  const handleScrollEnd = (e) => {
    const maxScrollPosition =
      scrollableRef.current.scrollWidth - scrollableRef.current.clientWidth;
    if (scrollableRef.current.scrollLeft >= maxScrollPosition) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  };

  const handleExistingFeatured = (e) => {};
  return (
    <>
      <Fbcard>
        <div className="personal-bio">
          <h4>Intro</h4>
          {showBio ? (
            <div className="quick-edit">
              <textarea
                onChange={handleBioChange}
                placeholder="Describe who you are"
              >
                {user.bio}
              </textarea>
              <p>{remain} characters remaining</p>
              <div className="quick-status">
                <div className="status">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeESLLgzneo1R6z5mCpcbpDYc6lHD9kG4H5zqUcP2Qbgfo0MdGXddbJLJlakbjjL9QQWE2TuUlBgjL0mM6_qOBN0"
                    alt=""
                  />
                  <p>Public</p>
                </div>
                <div className="quick-btn">
                  <button
                    className="quick-cancel"
                    onClick={() => setShowBio(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`quick-save ${
                      bio.length <= 101 && "active-quick-save"
                    }`}
                    disabled={bio.length > 101 ? true : false}
                    onClick={handleBioUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>{user.bio}</p>
          )}

          {user.bio && !showBio && (
            <button className="personal-info-btn" onClick={handleEditBio}>
              Edit bio
            </button>
          )}
          {!user.bio && !showBio && (
            <button className="personal-info-btn" onClick={handleEditBio}>
              Add bio
            </button>
          )}
        </div>
        <div className="personal-info-details">
          <ul>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/4PEEs7qlhJk.png?_nc_eui2=AeHXrI4lfzDOuCsIDhD1RbBzu0ZhLjleVgW7RmEuOV5WBUBEw-c5_4Q2PGh27l2WYf2caxBgeCXY66mtep3FAk_W"
                alt=""
              />
              Profile <span className="text-bold">{user.category} </span>
            </li>
            {user.work.map((data, index) => (
              <li>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeGsmu5zEhzPnfJyf9J6n5iKQE0O-ZdJm-NATQ75l0mb49SAMWKSVKD-VezBnXAihmZhSHXYict4PhrpUqhVkBct"
                  alt=""
                />
                {data.position} at{" "}
                <span className="text-bold">{data.company}</span>
              </li>
            ))}
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeGsmu5zEhzPnfJyf9J6n5iKQE0O-ZdJm-NATQ75l0mb49SAMWKSVKD-VezBnXAihmZhSHXYict4PhrpUqhVkBct"
                alt=""
              />
              <span>Studying</span>
            </li>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeERdh-UGU0hOVdu4G29OqEiC7xezJFSLOkLvF7MkVIs6bwhMg4BrVfynCGmTdE6c29WFzizC0tHsDAo4AqmTzeX"
                alt=""
              />
              <span>Studied at Bara Aulia Degree College</span>
            </li>
            {user.living ? (
              <li>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeE9cs7c8gtvunLexXp6WPwmysO07LK9kRPKw7Tssr2RE5oOMq5CgRl3FdeAgOr--rSi31ucG5CTM0KET1QhZCAb"
                  alt=""
                />
                Lives in
                <span className="text-bold"> {user.living}</span>
              </li>
            ) : (
              ""
            )}
            {user.home_town ? (
              <li>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeEwscxTcnoVKBntth2ieDf8yuB9xaeJwC_K4H3Fp4nAL4soLJDUvh3mTrG0Pi3Z_j7wooFlRF-omG5R0N9PhxEn"
                  alt=""
                />
                From <span className="text-bold"> {user.home_town}</span>
              </li>
            ) : (
              ""
            )}

            {user.relationship ? (
              <li>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeFEF-sB5CWXAeFjiMYijti8rlG3yvH4CWGuUbfK8fgJYWB8-miwhyO1L0l5Uz8Zi23zwO6l8kTrg0vvqzfXLmEI"
                  alt=""
                />
                <span>{user.relationship}</span>
              </li>
            ) : (
              ""
            )}

            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/mp_faH0qhrY.png?_nc_eui2=AeEuHlVb5QCGDtpi2__jr1BmnFrlaiZVSWecWuVqJlVJZw5VyOPuR7BMALx64gNxoGL-3VUID46hB6j_ugRtR0ia"
                alt=""
              />
              <span>Joined April 2016</span>
            </li>
          </ul>
          <div className="wrap-modal">
            {modal && (
              <FbModal title="Edit Details" closePopUp={setModal}>
                <div className="details-modal-wrap">
                  <div className="details-modal-content">
                    <div className="modal-intro">
                      <h4>Customize your intro</h4>
                      <p>Details you select will be public</p>
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Category</h3>
                      </div>
                      <div className="modal-item-content">
                        {!catShow && !user.category && (
                          <a href="#" onClick={handleCatShow}>
                            <img
                              src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                              alt=""
                            />
                            <span>Add a Category</span>
                          </a>
                        )}
                        {user.category && !catShow && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/4PEEs7qlhJk.png?_nc_eui2=AeHXrI4lfzDOuCsIDhD1RbBzu0ZhLjleVgW7RmEuOV5WBUBEw-c5_4Q2PGh27l2WYf2caxBgeCXY66mtep3FAk_W"
                                alt=""
                              />
                              <span>Profile {user.category}</span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                onClick={() => setCatShow(true)}
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}
                      </div>
                      {catShow && (
                        <QuickEdit
                          hide={setCatShow}
                          data={{
                            placeholder: "Set your profile category",
                            data: cat,
                            setData: setCat,
                          }}
                          save={handleUpdateCat}
                        />
                      )}
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Work</h3>
                      </div>
                      <div className="modal-item-content">
                        {user.work.map((data, index) => (
                          <div className="modal-single-item" key={index}>
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeGsmu5zEhzPnfJyf9J6n5iKQE0O-ZdJm-NATQ75l0mb49SAMWKSVKD-VezBnXAihmZhSHXYict4PhrpUqhVkBct"
                                alt=""
                              />
                              <span> {data.position}</span> of
                              <strong> {data.company}</strong>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                className="delete-work"
                                onClick={() => handleWorkDelete(data.company)}
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        ))}

                        {jobShow && (
                          <QuickEdit
                            hide={setJobShow}
                            data={{
                              placeholder: "Set Company name",
                              data: company,
                              setData: setCompany,
                            }}
                            data2={{
                              placeholder: "Set company position",
                              data: position,
                              setData: setPosition,
                            }}
                            save={handleJobSave}
                          />
                        )}
                        <a href="#">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                            alt=""
                          />
                          <span onClick={() => setJobShow(!jobShow)}>
                            Add a workplace
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Education</h3>
                      </div>
                      <div className="modal-item-content">
                        {user.edu.school && !eduShow && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeGsmu5zEhzPnfJyf9J6n5iKQE0O-ZdJm-NATQ75l0mb49SAMWKSVKD-VezBnXAihmZhSHXYict4PhrpUqhVkBct"
                                alt=""
                              />
                              <span> {user.edu.school}</span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                className="delete-work"
                                onClick={() =>
                                  handleSchoolDelete(user.edu.school)
                                }
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}

                        {eduShow && (
                          <QuickEdit
                            hide={setEduShow}
                            data={{
                              placeholder: "School name",
                              data: school,
                              setData: setSchool,
                            }}
                            data2={{
                              placeholder: "College name",
                              data: college,
                              setData: setCollege,
                            }}
                            save={handleEduSave}
                          />
                        )}

                        {user.edu.college && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeGsmu5zEhzPnfJyf9J6n5iKQE0O-ZdJm-NATQ75l0mb49SAMWKSVKD-VezBnXAihmZhSHXYict4PhrpUqhVkBct"
                                alt=""
                              />
                              <span> {user.edu.college}</span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                className="delete-work"
                                onClick={() =>
                                  handleCollegeDelete(user.edu.college)
                                }
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}
                        {!user.edu &&
                          !eduShow(
                            <a href="#" onClick={() => setEduShow(!eduShow)}>
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                                alt=""
                              />
                              <span>Add Education </span>
                            </a>
                          )}
                      </div>
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Home town</h3>
                      </div>
                      <div className="modal-item-content">
                        {adressShow && (
                          <QuickEdit
                            hide={setAdressShow}
                            data={{
                              placeholder: "Set Hometown",
                              data: adress,
                              setData: setAdress,
                            }}
                            save={handleAdressSave}
                          />
                        )}
                        {!adressShow && !user.home_town && (
                          <a
                            href="#"
                            onClick={() => setAdressShow(!adressShow)}
                          >
                            <img
                              src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                              alt=""
                            />
                            <span>Add Hometown</span>
                          </a>
                        )}

                        {user.home_town && !adressShow && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeEwscxTcnoVKBntth2ieDf8yuB9xaeJwC_K4H3Fp4nAL4soLJDUvh3mTrG0Pi3Z_j7wooFlRF-omG5R0N9PhxEn"
                                alt=""
                              />
                              <span>
                                <strong>From</strong> {user.home_town}
                              </span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                onClick={() => setAdressShow(true)}
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}
                        {user.living && !adressLivingShow && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeE9cs7c8gtvunLexXp6WPwmysO07LK9kRPKw7Tssr2RE5oOMq5CgRl3FdeAgOr--rSi31ucG5CTM0KET1QhZCAb"
                                alt=""
                              />
                              <span>
                                <strong>Lives in</strong> {user.living}
                              </span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                onClick={() => setAdressLivingShow(true)}
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}
                        {adressLivingShow && (
                          <QuickEdit
                            hide={setAdressLivingShow}
                            data={{
                              placeholder: "Set Living Adress",
                              data: living,
                              setData: setLiving,
                            }}
                            save={handleAdressLivingSave}
                          />
                        )}
                        {!adressLivingShow && !user.living && (
                          <a
                            href="#"
                            onClick={() =>
                              setAdressLivingShow(!adressLivingShow)
                            }
                          >
                            <img
                              src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                              alt=""
                            />
                            <span>Add Living adress</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Relationship</h3>
                      </div>
                      <div className="modal-item-content">
                        {user.relationship && !relationShow && (
                          <div className="modal-single-item">
                            <div className="modal-single-item-left">
                              <img
                                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeE9cs7c8gtvunLexXp6WPwmysO07LK9kRPKw7Tssr2RE5oOMq5CgRl3FdeAgOr--rSi31ucG5CTM0KET1QhZCAb"
                                alt=""
                              />
                              <span>
                                <strong>Relationship</strong>{" "}
                                {user.relationship}
                              </span>
                            </div>
                            <div className="modal-single-item-right">
                              <span
                                onClick={() => setRelationShow(true)}
                                style={{
                                  backgroundImage:
                                    'url("https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/u0CglVMMI62.png?_nc_eui2=AeEn06mTMg0G7Q4uGU4dIqyqQW08VoUTXPlBbTxWhRNc-eOa2yzhkasE_YgcJHYYMY1kNMWHgtgdX6efvtMteQ-x")',
                                }}
                              ></span>
                            </div>
                          </div>
                        )}
                        {relationShow && (
                          <QuickEdit
                            hide={setRelationShow}
                            data={{
                              placeholder: "Set RelationShip",
                              data: relation,
                              setData: setRelation,
                            }}
                            save={handleRelation}
                          />
                        )}
                        {!user.relationship && (
                          <a
                            href="#"
                            onClick={() => setRelationShow(!relationShow)}
                          >
                            <img
                              src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                              alt=""
                            />
                            <span>Add Relationship</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Website</h3>
                      </div>
                      <div className="modal-item-content">
                        <a href="#">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                            alt=""
                          />
                          <span>Add a workplace</span>
                        </a>
                      </div>
                    </div>
                    <div className="modal-item">
                      <div className="modal-item-title">
                        <h3>Social link</h3>
                      </div>
                      <div className="modal-item-content">
                        <a href="#">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGX9pMPYGXrK-d-i4dn9-6cXco6tKIYP1Fdyjq0ohg_UbU9XBBcSqOZPowx19pFRgx1UwhM5iN52ESeCiYQtUDf"
                            alt=""
                          />
                          <span>Add a workplace</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="details-modal-footer">
                    <span>Update your information</span>
                    <div className="update-btns">
                      <button onClick={() => setModal(false)}>Cancel</button>
                      <button>Save</button>
                    </div>
                  </div>
                </div>
              </FbModal>
            )}
          </div>
          <button
            className="personal-info-btn"
            onClick={() => setModal(!modal)}
          >
            Edit Details
          </button>
        </div>
        <div className="personal-info-hobbies">
          <a href="">
            <img
              src="https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Globe1.png"
              alt=""
            />
            <span> Traveling</span>
          </a>
          <a href="">
            <img
              src="https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Globe1.png"
              alt=""
            />
            <span> Traveling</span>
          </a>
          <button className="personal-info-btn">Edit Hobbies</button>
        </div>

        {featured && (
          <FbModal
            title="Edit featured"
            closePopUp={setFeatured}
            addNew={handleFeaturedUpload}
          >
            <div className="edit-featured-wrap">
              <div className="edit-existing-featured-wrap">
                {!user.featured ? (
                  <img src={featuredImg} alt="" />
                ) : (
                  <>
                    <div className="edit-existing-featured">
                      <div className="existing-featured-wrap">
                        {user.featured.map((item, index) => {
                          return (
                            <>
                              <div
                                className="existing-featured-item"
                                key={index}
                                id={index}
                                onClick={handleExistingFeatured}
                              >
                                <div className="left-featured-image">
                                  <img
                                    src={`/slider/${item.slider[0]}`}
                                    alt=""
                                  />
                                </div>
                                <div className="right-featured-content">
                                  <h6>{item.collection}</h6>
                                  <p>{item.slider.length} items</p>
                                  <span>updated 6 weeks ago</span>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </FbModal>
        )}

        {featuredUpload && (
          <>
            <FbModal title="Edit featured collection" back={handleBack}>
              <div className="edit-featured-wrap">
                <div className="upload-featured-photos">
                  <label htmlFor="upload-featured-photos">Upload Photos</label>
                  <input
                    onChange={handleFeauterUploadPic}
                    type="file"
                    multiple={true}
                    id="upload-featured-photos"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="upload-featured-prev featured-upload">
                  {featuredPhotos.map((data, index) => {
                    const prevUrl = URL.createObjectURL(data);
                    return (
                      <>
                        <div className="prev-item" key={index}>
                          <label htmlFor={`checkbox-${index}`}>
                            <img src={prevUrl} alt="" />
                          </label>
                          <div className="round">
                            <input
                              className="check-story"
                              type="checkbox"
                              value={data.name}
                              checked={featuredChecked.includes(data)}
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
              </div>

              {featuredCollection && (
                <>
                  <FbModal title="Edit featured collection">
                    <div className="edit-featured-wrap collection-featured-wrap">
                      <div className="upload-featured-photos">
                        <div className="featured-collection">
                          <h5>cover</h5>
                          <img src={URL.createObjectURL(featuredChecked[0])} />
                          <input
                            name="title"
                            id="collectionName"
                            placeholder="Title"
                            defaultValue={"collection"}
                            onChange={(e) => setCollectionName(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className="upload-featured-prev collection">
                        <div className="prev-item">
                          <a href="" onClick={handleFeaturedCollection}>
                            <i
                              style={{ backgroundImage: `url(${follow})` }}
                            ></i>
                            <span>Add More</span>
                          </a>
                        </div>
                        {featuredChecked.map((data, index) => {
                          const prevUrl = URL.createObjectURL(data);
                          return (
                            <>
                              <div className="prev-item" key={index}>
                                <label>
                                  <img src={prevUrl} alt="" />
                                </label>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="featured-collection-footer">
                      <button onClick={handleFeaturedCancel}>Cancel</button>
                      <button
                        disabled={featuredChecked.length === 0}
                        onClick={handleFeaturedSlider}
                      >
                        Save
                      </button>
                    </div>
                  </FbModal>
                </>
              )}
              <div className="featured-collection-footer">
                <button onClick={handleFeaturedCancel}>Cancel</button>
                <button
                  onClick={handleCollection}
                  disabled={featuredChecked.length === 0}
                >
                  Next
                </button>
              </div>
            </FbModal>
          </>
        )}
        <div className="personal-featured">
          <div className="overflow_manage_btn">
            <button onClick={() => handleOverFlowRight("left")}>
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            {showRightButton && (
              <button onClick={() => handleOverFlowRight("right")}>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            )}
          </div>
          <div
            className="personal-featured-gallery"
            id="gallery_overflow"
            ref={scrollableRef}
            onScroll={handleScrollEnd}
          >
            {fullWidthPopUp && (
              <PopUpFullWidth setFullWidthPopUp={setFullWidthPopUp}>
                <StorySlider
                  hide={setFullWidthPopUp}
                  featuredCount={featuredCount}
                />
              </PopUpFullWidth>
            )}

            {user.featured.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    id={index}
                    onClick={handleFeaturedSliderPopUp}
                    className="featured-item"
                    style={{
                      backgroundImage: `url(/slider/${item.slider[0]})`,
                    }}
                  >
                    <span>+ {item.slider.length}</span>
                    <p>{item.collection}</p>
                  </div>
                </>
              );
            })}
          </div>

          <button
            className="personal-info-btn"
            onClick={() => setFeatured(true)}
          >
            {user.featured ? "Edit Featured" : "Add Featured"}
          </button>
        </div>
      </Fbcard>
    </>
  );
};

export default ProfileIntro;
