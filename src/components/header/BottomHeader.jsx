import React from 'react'
import { Link, useLocation } from 'react-router-dom'

//icons
import { HiOutlineBookOpen } from "react-icons/hi2";
import { MdComputer } from "react-icons/md";

const BottomHeader = () => {
  const { pathname } = useLocation()
  const isWorkPage = pathname.startsWith('/work');

  return (
    <div className='bottomHeader'>
      <ul className='nav'>
        <li  className={pathname === '/home' ? 'active' : ''}>
          <Link className='nav-link' to="/">
            <HiOutlineBookOpen color='white' size={'20px'} />
            <span className='nav-text'>Overview</span>
          </Link>
        </li>
        {pathname === '/organization' || pathname === '/home' || isWorkPage ? (
          <li className={pathname === '/organization' ? 'active' : ''}>
            <Link className='nav-link' to="/organization">
              <MdComputer color='white' size={'20px'} />
              <span className='nav-text'>Organization</span>
              {/* 갯수 */}
            </Link>
          </li>
        ) : (
          <li className={pathname === '/repositories' || pathname === '/create-repo' ? 'active' : ''}>
            <Link className='nav-link' to="/repositories">
              <MdComputer color='white' size={'20px'} />
              <span className='nav-text'>repositories</span>
              {/* 갯수 */}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BottomHeader