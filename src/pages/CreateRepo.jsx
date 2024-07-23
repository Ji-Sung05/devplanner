import React, { useState } from 'react'
import Home from './Home'
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAuthQuery } from '../app/usersSlice'
import { useCreateRepoMutation } from '../app/apiSlice';
import CreateRepoBtn from './../components/UI/CreateRepoBtn';

const CreateRepo = () => {
  const { data } = useGetAuthQuery()
  const location = useLocation();
  const navigate = useNavigate();
  const org = {...location.state}
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  
  const [createRepo] = useCreateRepoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRepo({ 
        orgName: org.org, 
        repoName, 
        description, 
        visibility 
      }).unwrap();
      navigate(-1, { state: { org } });
    } catch (error) {
      console.error('Failed to create the repository: ', error);
    }
  };

  return (
    <Home>
      <section id='createrepo'>
        <div className='createrepo__inner'>
          <form onSubmit={handleSubmit}>
            <h3>Create a new repository</h3>
            <div className='createrepo__owner'>
              <div className='owner'>
                <p>Owner*</p>
                <div>
                  <img src={data.avatar_url} alt="프로필 사진" />
                  <p>{data.name}</p>
                </div>
              </div>
              <div className='owner'>
                <p>Repository name*</p>
                <input 
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  required />
              </div>
            </div>
            <div className='createrepo__desc'>
              <p>Description</p>
              <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='createrepo__visibility'>
              <label htmlFor="public">
                <input 
                  type="radio" 
                  id='public' 
                  name='visibility' 
                  value='public'
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')} />
                <span>Public</span>
              </label>
              <label htmlFor="private">
                <input 
                  type="radio" 
                  id='private' 
                  name='visibility' 
                  value='private'
                  checked={visibility === 'private'}
                  onChange={() => setVisibility('private')} 
                  />
                <span>Private</span>
              </label>
            </div>
            <CreateRepoBtn />
          </form>
        </div>
      </section>
    </Home>
  )
}

export default CreateRepo