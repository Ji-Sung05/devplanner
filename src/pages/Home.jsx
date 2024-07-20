import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Aside from '../components/layout/Aside'
import Main from '../components/layout/Main'
import Landing from './Landing'

const Home = (props) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');

    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      setUser(userData);
    }
    
  }, []);
  
  return (
    <div id='container'>
      <Header />
      <div style={{display: 'flex'}}>
        <Aside />
        <Main>
          {props.children ? props.children : <Landing />}
        </Main>
      </div>
    </div>
  )
}

export default Home