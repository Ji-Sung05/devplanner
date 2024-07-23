import React, { useEffect } from 'react';
import Home from './Home';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCopy } from "react-icons/bs";
import CreateBtn from '../components/UI/CreateBtn';
import { useGetReposQuery } from '../app/apiSlice';

const Repositories = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const org = location.state?.orgs

  const { data: repos, refetch } = useGetReposQuery(org, {
    skip: !org,
  });
  console.log(repos)

  useEffect(() => {
    if (org) {
      refetch(); 
    }
  }, [org, refetch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return `Updated on ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
  };

  const createClick = () => {
    navigate('/create-repo', { state: { org } });
  };

  return (
    <Home id='repositories'>
      <div className='repositories__inner'>
        <div className='repositories__header'>
          <input type="text" placeholder='Find a repository...' />
          <CreateBtn onClick={createClick} />
        </div>
        <div className='repositories__container'>
          {repos && repos.map((repo, key) => (
            <article key={key} className='repositories'>
              <div className='repositories__top'>
                <h3>{repo.name}</h3>
                <span>{repo.visibility}</span>
                <button><BsCopy color='white' /></button>
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

export default Repositories;
