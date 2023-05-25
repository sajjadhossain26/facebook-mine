import express from "express";
import multer from "multer";
import path from "path";
import {
  loggedInUser,
  login,
  register,
  activateAccount,
  accountActivateByCode,
  forgotPassword,
  passwordResetAction,
  resentActivation,
  findAccount,
  sendPasswordResetOTP,
  checkPasswordResetOTP,
  passwordReset,
  resendPasswordReset,
  profileBioUpdate,
  addFeaturedSlider,
  userProfilePhotoUpdate,
  userCoverPhotoUpdate,
  getAllUsers,
  sendFriendRequest,
  confirmFriendRequest,
  createPost,
} from "../controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve();

// Multer configaration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "slider") {
      cb(null, path.join(__dirname, "api/public/slider"));
    } else if (file.fieldname === "profile") {
      cb(null, path.join(__dirname, "api/public/profile"));
    } else if (file.fieldname === "cover") {
      cb(null, path.join(__dirname, "api/public/cover"));
    } else if (file.fieldname === "post") {
      cb(null, path.join(__dirname, "api/public/post"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const sliderFeatured = multer({ storage }).array("slider", 20);
const profilePhotoUpload = multer({ storage }).single("profile");
const coverPhotoUpload = multer({ storage }).single("cover");
const postPhoto = multer({ storage }).array("post", 20);

// user auth route
router.post("/login", login);
router.post("/register", register);
router.get("/me", loggedInUser);
router.get("/activate/:token", activateAccount);
router.post("/code-activate", accountActivateByCode);
router.post("/resend-activate", resentActivation);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/:token", passwordResetAction);
router.post("/find-account", findAccount);
router.post("/send-password-reset", sendPasswordResetOTP);
router.post("/check-password-reset-otp", checkPasswordResetOTP);
router.post("/user-password-reset", passwordReset);
router.post("/resend-password-reset", resendPasswordReset);
router.put(
  "/profile-photo-update/:id",
  profilePhotoUpload,
  userProfilePhotoUpdate
);
router.put("/cover-photo-update/:id", coverPhotoUpload, userCoverPhotoUpdate);

// User profile
router.put("/profile-update/:id", profileBioUpdate);
router.post("/featured-slider/:id", sliderFeatured, addFeaturedSlider);

//  Profile route
router.get("/users/:id", getAllUsers);

// Friend request route
router.get("/add-friend/:receiver/:sender", sendFriendRequest);
router.get("/confirm-friend-request/:sender/:receiver", confirmFriendRequest);

// Create Post
router.post("/post/:id", postPhoto, createPost);

export default router;
