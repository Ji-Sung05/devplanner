import React from 'react'
import { useNavigate } from 'react-router-dom';
import Home from './Home'
import { RiFileAddLine } from "react-icons/ri";
import { useGetOrgsQuery } from '../app/apiSlice'

const Organization = () => {
  const { data: orgs, isLoading } = useGetOrgsQuery();
  const navigate = useNavigate();

  const moveRepoPage = (orgs) => {
    navigate('/repositories', { state: { orgs } });
  }

  return (
    <Home id='orgs'>
      <div className='orgs__inner'>
        <div className='orgs__header'>
          <input type="text" placeholder='Find a repository...' />
          <button>
            <RiFileAddLine size={17} />
            New
          </button>
        </div>
        <div className='orgs__container'>
          {orgs && orgs.map((org, key) => (
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