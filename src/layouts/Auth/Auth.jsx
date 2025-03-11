import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="bg-[#F4F9FB]">
      <div className="max-w-[1620px] flex justify-center items-center mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
