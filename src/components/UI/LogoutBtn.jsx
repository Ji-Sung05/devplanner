import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'

const LogoutBtn = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div className='logoutBtn' onClick={handleLogout}>Logout</div>
  )
}

export default LogoutBtn