import React from "react";
import { useLocation } from "react-router-dom";
//아이콘
import { FaGithub } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdHelpCircleOutline, IoMdRefresh } from "react-icons/io";
import { MdComputer } from "react-icons/md";
//컴포넌트
import NavItem from "../NavItem";

const Navigation = () => {
  const { pathname } = useLocation();
  const isWorkPage = pathname.startsWith("/work");

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header id="header" role="banner">
      <div className="topHeader">
        <FaGithub className="main-logo" color="white" />
        <span className="main-title">DevPlan</span>
      </div>
      <div className="bottomHeader">
        <ul className="nav">
          <NavItem
            to={"/home"}
            text={"Overview"}
            icon={<HiOutlineBookOpen color="white" size={"20px"} />}
          />
          {pathname === "/organization" ||
          pathname === "/home" ||
          pathname === "/manual" ||
          isWorkPage ? (
            <NavItem
              to={"/organization"}
              text={"Organization"}
              icon={<HiOutlineBookOpen color="white" size={"20px"} />}
            />
          ) : (
            <NavItem
              to={"/repositories"}
              text={"repositories"}
              icon={<MdComputer color="white" size={"20px"} />}
            />
          )}
          <NavItem
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
