import React from "react";
import { Link, useLocation } from "react-router-dom";
//아이콘
import { FaGithub } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdHelpCircleOutline, IoMdRefresh } from "react-icons/io";
import { MdComputer } from "react-icons/md";

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
          <li className={pathname === "/home" ? "active" : ""}>
            <Link className="nav-link" to="/home">
              <HiOutlineBookOpen color="white" size={"20px"} />
              <span className="nav-text">Overview</span>
            </Link>
          </li>
          {pathname === "/organization" ||
          pathname === "/home" ||
          pathname === "/manual" ||
          isWorkPage ? (
            <li className={pathname === "/organization" ? "active" : ""}>
              <Link className="nav-link" to="/organization">
                <MdComputer color="white" size={"20px"} />
                <span className="nav-text">Organization</span>
              </Link>
            </li>
          ) : (
            <li
              className={
                pathname === "/repositories" || pathname === "/create-repo"
                  ? "active"
                  : ""
              }
            >
              <Link className="nav-link" to="/repositories">
                <MdComputer color="white" size={"20px"} />
                <span className="nav-text">repositories</span>
              </Link>
            </li>
          )}
          <li className={pathname === "/manual" ? "active" : ""}>
            <Link className="nav-link" to="/manual">
              <IoMdHelpCircleOutline color="white" size={"20px"} />
              <span className="nav-text">Manual</span>
            </Link>
          </li>
        </ul>
        <button onClick={handleRefresh} className="refreshBtn">
          <IoMdRefresh color="white" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navigation;
