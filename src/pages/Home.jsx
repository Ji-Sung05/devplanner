import React from 'react'
import Header from '../components/layout/Header'
import Aside from '../components/layout/Aside'
import Main from '../components/layout/Main'
import Landing from './Landing'
import { useLocation } from 'react-router-dom'

const Home = (props) => {
  const location = useLocation()
  const isWorkPage = location.pathname.slice(0,5) === '/work';
  return (
    <div id='container'>
      <Header />
      <div className={`container__inner ${isWorkPage ? 'work' : ''}`}>
        <Aside />
        <Main>
          {props.children ? props.children : <Landing />}
        </Main>
      </div>
    </div>
  )
}

export default Home