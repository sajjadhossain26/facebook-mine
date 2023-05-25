import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Activation from "./pages/Activation/Activation";
import Forgot from "./pages/Forgot/Forgot";
import FindAccount from "./pages/FindAccount/FindAccount";
import { Password } from "./pages/Password/Password";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_END } from "./redux/loader/loaderTypes";
import AuthReject from "./privateRoute/AuthReject";
import { useEffect } from "react";
import { tokenUser } from "./redux/auth/authAction";
import AuthRedirect from "./privateRoute/AuthRedirect";
import Login from "./components/Login/Login";
import Friends from "./pages/Friends/Friends";
import LoggedInRoute from "./privateRoute/LoggedInRoute";
import LoggedOutRoute from "./privateRoute/LoggedOutRoute";
import FriendRequest from "./components/Friends/FriendRequest/FriendRequest";

function App() {
  const loader = useSelector((state) => state.loader);
  const loaderDispatch = useDispatch();
  const tokenDispatch = useDispatch();

  useEffect(() => {
    tokenDispatch(tokenUser());
  }, [tokenDispatch]);
  return (
    <>
      <LoadingBar
        color="#1876f2"
        progress={loader}
        onLoaderFinished={() => loaderDispatch({ type: LOADER_END })}
      />
      <ToastContainer
        style={{ zIndex: 99999999 }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<LoggedOutRoute />}>
          <Route path="/login" element={<Auth />} />
        </Route>
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} />

          <Route path="/friends" element={<Friends />} />
          <Route path="/friend-request" element={<FriendRequest />} />
        </Route>
        <Route path="/activation/:type" element={<Activation />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/change-password" element={<Password />} />
      </Routes>
    </>
  );
}

export default App;
