import React from "react";
import { Link, useLocation } from "react-router-dom";
//아이콘
import { FaGithub } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdHelpCircleOutline, IoMdRefresh } from "react-icons/io";
import { MdComputer } from "react-icons/md";
import NavItem from "../NavItem";

const Navigation = () => {
  const { pathname } = useLocation();
  const isWorkPage = pathname.startsWith("/work");

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header id="header" role="banner">
      <div className='topHeader'>
        <FaGithub className='main-logo' color='white' />
        <span className='main-title'>DevPlan</span>
      </div>
      <div className="bottomHeader">
        <ul className="nav">
          <NavItem
            pathname={pathname}
            to={"/home"}
            text={"Overview"}
            icon={<HiOutlineBookOpen color="white" size={"20px"} />}
          />
          {pathname === "/organization" ||
          pathname === "/home" ||
          pathname === "/manual" ||
          isWorkPage ? (
            <NavItem 
              pathname={pathname} 
              to={"/organization"} 
              text={"Organization"}
              icon={<HiOutlineBookOpen color="white" size={"20px"} />} 
            />
          ) : (
            <NavItem 
              pathname={pathname}
              to={"/repositories"}
              text={"repositories"}
              icon={<MdComputer color="white" size={"20px"} />}
            />
          )}
          <NavItem 
            pathname={pathname}
            to={"/manual"}
            text={"Manual"}
            icon={<IoMdHelpCircleOutline color="white" size={"20px"} />}
          />
        </ul>
        <button onClick={handleRefresh} className="refreshBtn">
          <IoMdRefresh color="white" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navigation;
