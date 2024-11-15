import React from "react";
import { FaFaceMeh } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { useGetAuthQuery } from "../../app/usersSlice";
import LogoutBtn from "./../UI/LogoutBtn";

// Aside 는 html 태그 이름 -> 컴포넌트의 목적에 맞테 예를들면 SideBar?
const Aside = () => {
  const { data } = useGetAuthQuery();

  return (
    <aside id="aside" role="contentinfo">
      <div className="aside__inner">
        <div className="aside__inner__top">
          <div className="aside__profile">
            {data ? (
              <img src={data.avatar_url} alt="프로필 사진" />
            ) : (
              <FaFaceMeh size={280} color="#c4c3c3" />
            )}
          </div>
          <div className="aside__info">
            {data ? <h3>{data.name}</h3> : null}
            <div>
              <MdOutlineMailOutline />
              {data ? <p>{data.email}</p> : null}
            </div>
          </div>
        </div>
        <div className="aside__inner__bottom">
          <LogoutBtn />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
