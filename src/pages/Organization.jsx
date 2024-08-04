import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Home from './Home'
import { useGetOrgsQuery } from '../app/apiSlice'

const Organization = () => {
  const { data: orgs } = useGetOrgsQuery();
  const navigate = useNavigate();
  
  const [filterText, setFilterText] = useState('');
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  
  const filteredorgs = filterText
    ? orgs?.filter(org =>
        org.login.toLowerCase().includes(filterText.toLowerCase())
      )
    : orgs;
  
  const moveRepoPage = (orgs) => {
    navigate('/repositories', { state: { orgs } });
  }

  return (
    <Home id='orgs'>
      <div className='orgs__inner'>
        <div className='orgs__header'>
          <input type="text" placeholder='Find a organization...' onChange={handleFilterChange} />
        </div>
        <div className='orgs__container'>
          {filteredorgs && filteredorgs.map((org, key) => (
            <article key={key} className='orgs'>
              <div className='orgs__top' onClick={() => {
                moveRepoPage(org.login)
              }}>
                <img src={org.avatar_url} alt="orgs 이미지" />
                <h3>{org.login}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Home>
  )
}

export default Organization