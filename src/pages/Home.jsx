import React from 'react'
import Header from '../components/layout/Header'
import Aside from '../components/layout/Aside'
import Main from '../components/layout/Main'
import Landing from './Landing'
import { useLocation } from 'react-router-dom'

const Home = (props) => {
  const {pathname} = useLocation()
  return (
    <div id='container'>
      <Header />
      <div className={`container__inner ${pathname === 'work' ? 'hide' : ''}`}>
        <Aside />
        <Main>
          {props.children ? props.children : <Landing />}
        </Main>
      </div>
    </div>
  )
}

export default Home