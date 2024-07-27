import React from 'react'
import Header from '../components/layout/Header'
import Aside from '../components/layout/Aside'
import Main from '../components/layout/Main'
import Landing from './Landing'

const Home = (props) => {
  
  return (
    <div id='container'>
      <Header />
        <div className={`container__inner`}>
          <Aside />
          <Main>
            {props.children ? props.children : <Landing />}
          </Main>
        </div>
    </div>
  )
}

export default Home