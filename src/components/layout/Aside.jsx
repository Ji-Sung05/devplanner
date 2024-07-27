import React from 'react'
import { useGetAuthQuery } from '../../app/usersSlice'
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFaceMeh } from "react-icons/fa6";
import LogoutBtn from './../UI/LogoutBtn';
import { useLocation } from 'react-router-dom';

const Aside = () => {
  const { data, isLoading } = useGetAuthQuery();
  const location = useLocation()
  const isWorkPage = location.pathname.startsWith('/work');

  if(isLoading) return <div>Loading...</div>
  return (
    <aside id='aside' role='contentinfo' className={isWorkPage ? 'hide' : ''}>
      <div className="aside__inner">
        <div className="aside__profile">
          {data ? <img src={data.avatar_url} alt="프로필 사진" /> : <FaFaceMeh size={280} color='#c4c3c3' />}
        </div>
        <div className="aside__info">
          {data ? <h3>{data.name}</h3> : null}
          <div>
            <MdOutlineMailOutline />
            {data ? <p>{data.email}</p> : null}
          </div>
        </div>
      </div>
      <LogoutBtn />
    </aside>
  )
}

export default Aside