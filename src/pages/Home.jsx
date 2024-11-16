import React from 'react'
import { useLocation } from 'react-router-dom'
//레이아웃
import Header from '../components/layout/Header'
import SideBar from './../components/layout/SideBar';
import Main from '../components/layout/Main'
//페이지
import Landing from './Landing'

const Home = (props) => {
  const location = useLocation()
  const isWorkPage = location.pathname.slice(0,5) === '/work';
  return (
    <div id='container'>
      <Header />
      <div className={`container__inner ${isWorkPage ? 'work' : ''}`}>
        <SideBar />
        <Main>
          {props.children ? props.children : <Landing />}
        </Main>
      </div>
    </div>
  )
}

export default Home