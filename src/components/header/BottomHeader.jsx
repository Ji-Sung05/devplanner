import React from 'react'
import { Link, useLocation } from 'react-router-dom'

//icons
import { HiOutlineBookOpen } from "react-icons/hi2";
import { MdComputer } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

const BottomHeader = () => {
  const { pathname } = useLocation()

  return (
    <div className='bottomHeader'>
      <ul className='nav'>
        <li  className={pathname === '/home' ? 'active' : ''}>
          <Link className='nav-link' to="/">
            <HiOutlineBookOpen color='white' size={'20px'} />
            <span className='nav-text'>Overview</span>
          </Link>
        </li>
        {pathname === '/organization' || pathname === '/stars' || pathname === '/home' ? (
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
        <li className={pathname === '/stars' ? 'active' : ''}>
          <Link className='nav-link' to="/stars">
            <MdOutlineStarBorder color='white' size={'20px'} />
            <span className='nav-text'>Stars</span>
            {/* 갯수 */}
          </Link>
        </li>
        {/* 페이지 파라미터를 읽어서 Repositories 페이지면 url 출력 */}
      </ul>
    </div>
  )
}

export default BottomHeader