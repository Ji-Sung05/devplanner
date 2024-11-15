import React from "react";
import { Link, useLocation } from "react-router-dom";

//icons
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdHelpCircleOutline, IoMdRefresh } from "react-icons/io";
import { MdComputer } from "react-icons/md";

// Navigation bar at the bottom of the screen
const BottomHeader = () => {
  const { pathname } = useLocation();
  const isWorkPage = pathname.startsWith("/work");

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
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
  );
};

export default BottomHeader;
