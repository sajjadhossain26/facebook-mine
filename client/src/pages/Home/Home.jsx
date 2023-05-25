import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import TimeLine from "../../components/TimeLine/TimeLine";
import Auth from "../Auth/Auth";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

const Home = () => {
  const { loginState } = useSelector((state) => state.auth);

  return (
    <>
      {loginState ? (
        <>
          <HomeHeader />

          <div className="fb-home-body">
            <Sidebar />
            <TimeLine />
            <RightSidebar />
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
