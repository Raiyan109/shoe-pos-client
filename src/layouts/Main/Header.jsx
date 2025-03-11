import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { HiOutlineBell } from "react-icons/hi2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Select } from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (

    <div className="w-full h-[88px] flex justify-between items-center rounded-sm py-[16px] px-[32px] shadow-lg bg-[#174C6B]">
      <div className="text-start space-y-0.5">
        {/* <p className="text-sm md:text-xl font-light">
          {"Welcome, Jane Cooper"}
        </p>
        <p className="text-sm md:text-xl">{"Have a nice day!"}</p> */}
      </div>
      <div className="flex gap-x-[41px]">
        {/* <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#37B5FF", width: '20px', height: '20px', objectFit: 'contain' }} count={1}>
            <div className="bg-[#EBF8FF] p-2 rounded-full">
              <HiOutlineBell
                style={{ cursor: "pointer" }}
                className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all text-darkBlue`}
              />
            </div>
          </Badge>
        </div> */}
        <div className="flex items-center gap-4">
          <div>
            <img src={profileImage} alt="" className="rounded-full h-[42px] w-[42px]" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-white text-lg">Jane</h1>
            <h1 className="text-white text-xs">Admin</h1>
          </div>
          {/* <Select
            defaultValue="Jane Cooper"
            style={{
              width: 120,
            }}
            bordered={false}
            suffixIcon={<MdOutlineKeyboardArrowDown color="black" fontSize={20} />}
            onChange={handleChange}
            options={[
              {
                value: 'Jane Cooper',
                label: 'Jane Cooper',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              }
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
