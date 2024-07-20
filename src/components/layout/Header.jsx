import React from 'react'
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';

const Header = () => {
  return (
    <header id='header' role='banner'>
      <TopHeader />
      <BottomHeader />
    </header>
  )
}

export default Header