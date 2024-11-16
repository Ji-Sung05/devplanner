import React from 'react'
import { Link } from "react-router-dom";

const NavItem = ({ pathname, to, text, icon }) => {
  return (
    <li className={pathname === to ? "active" : ""}>
      <Link className="nav-link" to={to}>
        {icon}
        <span className="nav-text">{text}</span>
      </Link>
    </li>
  )
}

export default NavItem