import React from 'react'
import Home from './Home'
import { RiFileAddLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom';

const Repositories = () => {
  const location = useLocation();
  const repos = {...location.state}
  const Repos = repos.repos
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return `Updated on ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
  };
  return (
    <Home id='repositories'>
      <div className='repositories__inner'>
        <div className='repositories__header'>
          <input type="text" placeholder='Find a repository...' />
          <button>
            <RiFileAddLine size={17} />
            New
          </button>
        </div>
        <div className='repositories__container'>
          {Repos && Repos.map((repo, key) => (
            <article key={key} className='repositories'>
              <div className='repositories__top'>
                <h3>{repo.name}</h3>
                <span>{repo.visibility}</span>
              </div>
              <div className='repositories__bottom'>
                <span>{repo.language}</span>
                <span>{formatDate(repo.updated_at)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Home>
  )
}

export default Repositories