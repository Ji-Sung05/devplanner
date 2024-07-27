import React from 'react'
import { useLocation } from 'react-router-dom';

const Main = ({children}) => {
  const location = useLocation()
  const isWorkPage = location.pathname.startsWith('/work');
  return (
    <main id='main' role='main' className={isWorkPage ? 'full' : ''}>{children}</main>
  )
}

export default Main