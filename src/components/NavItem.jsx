import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, text, icon }) => {
  const { pathname } = useLocation();
  return (
    <li className={pathname === to ? "active" : ""}>
      <Link className="nav-link" to={to}>
        {icon}
        <span className="nav-text">{text}</span>
      </Link>
    </li>
  );
};

export default NavItem;
