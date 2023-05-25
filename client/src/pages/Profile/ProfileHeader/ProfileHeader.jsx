import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar/Avatar";
import FbModal from "../../../components/FbModal/FbModal";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utility/cropper";
import axios from "axios";
import {
  coverPhotoUpload,
  profilePhotoUpload,
} from "../../../redux/auth/authAction";
import usePopupClose from "../../../hooks/usePopupClose";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileManage, setProfileManage] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // cover pic
  const [coverPicManage, setCoverPicManage] = useState(false);
  const [coverPic, setCoverPic] = useState(null);
  //  user ref
  const coverPicRef = useRef(null);
  usePopupClose(coverPicRef, setCoverPicManage);

  const dispatch = useDispatch();

  const handleProfilePicUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setImage(img);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      setImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const handleProfilePhotoUpdate = async (e) => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      setImage(croppedImage);

      const finalImageBlob = await fetch(croppedImage).then((res) =>
        res.blob()
      );
      const finalFile = new File([finalImageBlob], "profile_photo.png", {
        type: "image/png",
      });

      const form_data = new FormData();
      form_data.append("profile", finalFile);

      dispatch(profilePhotoUpload(form_data, user._id));
      setProfileManage(false);
      setImage(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  // cover pic url create and manage
  const handleCoverPicUrl = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setCoverPic(url);
  };

  const handleCoverPhotoUpdate = async (e) => {
    try {
      const croppedImage = await getCroppedImg(
        coverPic,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      setCoverPic(croppedImage);

      const finalImageBlob = await fetch(croppedImage).then((res) =>
        res.blob()
      );
      const finalFile = new File([finalImageBlob], "cover_photo.png", {
        type: "image/png",
      });
      console.log(finalFile);

      const form_data = new FormData();
      form_data.append("cover", finalFile);

      dispatch(coverPhotoUpload(form_data, user._id));
      setCoverPicManage(false);
      setCoverPic(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCoverPicCancel = (e) => {
    setCoverPicManage(false);
    setCoverPic(null);
  };

  return (
    <>
      <div className="fb-profile-header">
        <div className="fb-header-shad"></div>
        <div className="fb-cover-photo">
          {coverPic ? (
            <Cropper
              image={coverPic}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              aspect={16 / 9}
            />
          ) : (
            <img
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={
                user.cover_photo
                  ? `/cover/${user.cover_photo}`
                  : "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"
              }
              alt=""
            />
          )}

          <div className="fb-cover-manage-btn" ref={coverPicRef}>
            <button
              onClick={(e) => {
                setCoverPicManage(!coverPicManage);
              }}
            >
              <span className="camera-icon"></span> Edit cover photo
            </button>

            {coverPicManage && (
              <>
                <div className="photo-manage-popup">
                  <div className="photo-manage-popup-wrap">
                    <div className="photo-manage-btn">
                      <input
                        type="file"
                        id="coverPic"
                        onChange={handleCoverPicUrl}
                      />
                      <label htmlFor="coverPic">
                        <i class="fa fa-upload" aria-hidden="true"></i>
                        <span>Upload Cover Photo</span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="fb-profile-details">
          <div className="profile-info">
            <div
              className="profile-photo"
              onClick={() => setProfileManage(true)}
            >
              <Avatar />
              <i class="fa-solid fa-camera"></i>
            </div>
            <div className="profile-desc">
              <h1>{user.first_name + " " + user.sur_name}</h1>
              <div className="profile-follow-details">
                <span className="profile-followers">15k follower</span>
                <span className="profile-following">1k following</span>
              </div>
              <div className="profile-friends-list">
                <ul>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="profile-action">
            <button>
              <span className="follow-icon"></span> <span>Follow</span>
            </button>
            <button>
              <span className="message-icon"></span> <span>Message</span>
            </button>
            <button className="blue">
              <span className="add-friend-icon"></span> <span>Add friend</span>
            </button>
          </div>
        </div>
        <div className="fb-profile-menu">
          <ul>
            <li>
              <a href="#">Posts</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Followers</a>
            </li>
            <li>
              <a href="#">Photos</a>
            </li>
            <li>
              <a href="#">Videos</a>
            </li>
            <li>
              <a href="#">Articlse</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
          </ul>
        </div>
      </div>

      {/* cover Pic Alert */}
      {coverPic && (
        <div className="cover-pic-alert-manage">
          <div className="cover-pic-left">
            <div className="cover-alert-left-content">
              <i class="fa-solid fa-globe"></i>
              <span>Your Cover Photo is Public</span>
            </div>
          </div>
          <div className="cover-pic-right">
            <div className="featured-collection-footer">
              <button onClick={handleCoverPicCancel}>Cancel</button>
              <button onClick={handleCoverPhotoUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}

      {profileManage && (
        <>
          <FbModal title="Update profile picture" closePopUp={setProfileManage}>
            {!image && (
              <div className="profile-manage-zone">
                <label htmlFor="profile-photo">
                  <i class="fa-solid fa-plus"></i>
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    id="profile-photo"
                    onChange={handleProfilePicUpload}
                  />
                </label>
              </div>
            )}
            {image && (
              <div className="profile-crop-wrap">
                <div className="profile-description">
                  <input type="text" placeholder="Description" />
                </div>
                <div className="profile-crop-zone">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={"round"}
                    showGrid={false}
                  />
                </div>
                <div className="photo-slider">
                  <button>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                  />
                  <button>
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="photo-crop">
                  <button onClick={showCroppedImage}>
                    <i class="fa-solid fa-crop"></i>
                    <span>Crop Photo</span>
                  </button>
                  <button>
                    <i class="fa-solid fa-clock"></i>
                    <span>Make Temporary</span>
                  </button>
                </div>
              </div>
            )}
            <div className="featured-collection-footer">
              <button onClick={() => setProfileManage(false)}>Cancel</button>
              <button onClick={handleProfilePhotoUpdate}>Save</button>
            </div>
          </FbModal>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
