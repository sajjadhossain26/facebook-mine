import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import "./RightSidebar.scss";
import FriendBox from "../Friends/FriendBox/FriendBox";
import { allUsers } from "../../redux/auth/authAction";

const RightSidebar = () => {
  const dispatch = useDispatch();

  const { users, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(allUsers(user._id));
  }, []);
  return (
    <>
      <div className="right-sidebar">
        <div className="right-sidebar-wrap">
          <div className="sideber-profile">
            <p>Your Pages and profiles</p>
            <ul>
              <li>
                <Link to="/profile" className="sidebar-profile">
                  <div className="body-icon">
                    <Avatar />
                  </div>
                  &nbsp;&nbsp;
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </Link>
              </li>
            </ul>
          </div>
          <hr />

          <div className="sidebar-friend-request">
            <div className="friend_title">
              <h6>Friend Requested</h6>
              <Link to="/friends">See All</Link>
            </div>

            <div className="All_friend-box">
              {users.map((item, index) => {
                if (user.request.includes(item._id)) {
                  return (
                    <Link to="/friends" key={index}>
                      <FriendBox user={item} buttonState="request" />
                    </Link>
                  );
                }
              })}
            </div>
          </div>

          <div className="right-sidebar-contact">
            <span>Contacts</span>
            <ul>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/337015446_1154868622555317_8517412524507497411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEodHXVm72obwYbvLWGUw7-0BpaqJyyQZ_QGlqonLJBnwNXirZmxlNZ4WOVRDb1xF3xTp1wUusrYJervpueTftA&_nc_ohc=pHJFemuzkG8AX-vuRTh&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfBkHWYcN0G43Ykm3jHuUQ10ipz0uv2ftQvqvCLfhDNgzQ&oe=646228B6"
                    alt=""
                  />
                </a>
                <span>NAYEEM</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/245406397_1786174305103331_7743334725978772342_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFW6bXfNKKe3Jv0HK6nvty6CT_Ai7_9I_cJP8CLv_0j91Rn6eH-vUrpMbhUXMLVVSsDBOfj3L2r3ijFDtsW7Dak&_nc_ohc=Cn3-z191ZZYAX-9QBSa&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfAQC4gwHNR9im86TIcaF9SLZsd-0fTvJGKVd6GDPheEGg&oe=64622942"
                    alt=""
                  />
                </a>
                <span>মিটু মনি</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-1/269988192_2813277628974595_2771320828781617534_n.jpg?stp=c0.17.200.200a_dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHTBzRQ3WzCm8eYmmnyBE9fLOA76dysMrcs4Dvp3Kwytw8i6s0XXD9afpwrWu-x-0UvJHZU9FO6vDT6K3VzyomP&_nc_ohc=pCl7EKdzKnIAX-sifBv&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfCAvH7V7HWvZCewZqYbVm3hixZluWkMIEivPGrIUdmKkw&oe=64616D44"
                    alt=""
                  />
                </a>
                <span>Al-Amin</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/330087544_1200576124164730_831125826326881104_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFGJntQMQGZaT-RwIyIiFSv7_Qei4-Pzavv9B6Lj4_Nq_qq7X1X1scGE1jYQEaPRchGIf9lh08YU-9B-87xqBkz&_nc_ohc=XVCX8hry-zIAX_0HTdg&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfB7BkfO2V9eYWMhfnOcBAFxpzwP_EWmqQ6F0ed_2-odiA&oe=6461E343"
                    alt=""
                  />
                </a>
                <span>Mohammed Sha Jahan</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/308633714_101055166114313_6968598364736520497_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGbBblEx23dmoXY1i2TuUODzPPpUAquJ-XM8-lQCq4n5dGYwGHvAZfpElfQYs1hToTauH-8yTpJ51-qyB_VuFPh&_nc_ohc=_qms7flPfHAAX-Kz8sr&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfCNB5zhkw9bBdXYHZiGROUw8DEZCo6BMUWfyMVuc-gLRw&oe=64621FD5"
                    alt=""
                  />
                </a>
                <span>MD Mojjammel Hoque</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-1/343071612_1270983590177228_1143046784776351294_n.jpg?stp=c0.92.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=f67be1&_nc_eui2=AeHm5GzhXXbE-j6nvlLsQrnRTxRI4e3MPoxPFEjh7cw-jCQp7_eFv1N_WuT5TI9yXxpcNx8ZwNLddCeRREV1zlOO&_nc_ohc=DlGLz8cvCe8AX-Mrczt&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfDyI2KuFL3Pp4LnB4rBqfB5JtzYwhJppgyzhDNYdTHCLg&oe=64618040"
                    alt=""
                  />
                </a>
                <span>Nayeem Uddin</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-1/334670861_597425885626495_6726043637700307267_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=f67be1&_nc_eui2=AeG0Hh1kB09cxMeC6jeb92RbOE8YN93JrXU4Txg33cmtddVFAreNel2QuAWH9Ihoe9k1EfNNgtPgu6j0ml2b-9ne&_nc_ohc=0c7XM8EarwoAX-d5iGn&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfABg1pylNocg2o6SkVpOzrZHz-Do9JJJRPkPJDfxvFOSA&oe=6462E455"
                    alt=""
                  />
                </a>
                <span>Saiful Islam Saif</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t39.30808-6/337109323_872548493844187_7332941395093346507_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFjvVeA-f5MhgvEp4i0dUsDOxg4jAg1Cjc7GDiMCDUKN9OXm4MVgt_ec4AaKbyy6fbqelbhBchkaIS1vlbUMk-h&_nc_ohc=ZCVKUOixGlQAX9ysu6r&_nc_ht=scontent.fcgp29-1.fna&oh=00_AfBlDzMriXBmMazKHdgajyNOCuPqmGfxYU9nOjO-uVXaTw&oe=64629421"
                    alt=""
                  />
                </a>
                <span>Shahiidul Islam</span>
              </li>
            </ul>
          </div>
          <hr />

          <div className=" right-sidebar-contact right-sidber-group-conversation">
            <span>Group conversations</span>
            <ul>
              <li>
                <a href="">
                  <img
                    src="https://scontent.fcgp29-1.fna.fbcdn.net/v/t1.15752-9/169686328_427337695350176_7858732310690725173_n.jpg?stp=dst-jpg_p100x100&_nc_cat=110&ccb=1-7&_nc_sid=4de414&_nc_eui2=AeGUp8h8QJkOwNRyccAce1aPwW5wRm_Vs2zBbnBGb9WzbKyBgZ9YeJHna952B9RDgmDBcRnhbf4bNw62G2UldKeu&_nc_ohc=seGyxXVGwZwAX_X8uPk&_nc_ht=scontent.fcgp29-1.fna&oh=03_AdSp9ORl-sNvHACslShwlhxAayTFtzbKB-15-bQOFX6vQA&oe=64847097"
                    alt=""
                  />
                </a>
                <span>সুখছড়ী ইয়ং সোসাইটি</span>
              </li>
              <li>
                <a href="">
                  <img
                    src="https://media.istockphoto.com/photos/programming-code-abstract-technology-background-of-software-deve-picture-id537331500?b=1&k=20&m=537331500&s=612x612&w=0&h=Ni1xaMtCOiGvH4NKnl7Y4uTMqXEjd8cYwBDDOjk4TKE="
                    alt=""
                  />
                </a>
                <span>MERN - Job Preparations with Pro Level</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
