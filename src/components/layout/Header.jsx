import React from "react";
import BottomHeader from "../header/BottomHeader";
import TopHeader from "../header/TopHeader";

// Header -> Navigation
// 컴포넌트를 나누는 기준 -> 그 컴포넌트들이 독립적으로 재사용 될 수 있는지를 고민
// 무조건 코드량이 많아져서 나눈다는 저는 좋은 기준이 아니라고 생각합니다.
// 파일단위로 나누지 않고 한 파일 안에서 나누어서 작성할수도 있음.

const Header = () => {
  return (
    <header id="header" role="banner">
      <TopHeader />
      <BottomHeader /> {/* BottomHeader 가 Navigation 역할  */}
    </header>
  );
};

export default Header;
