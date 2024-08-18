import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'

const LogoutBtn = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className='logoutBtn' onClick={logout}>Logout</div>
  )
}

export default LogoutBtn