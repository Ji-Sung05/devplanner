import React, { useEffect, useState } from 'react';
import Home from './Home';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsCopy } from "react-icons/bs";
import CreateBtn from '../components/UI/CreateBtn';
import { useCloneRepoMutation, useGetReposQuery, useDeleteRepoMutation } from '../app/apiSlice';
import { useCreateProjectMutation } from '../app/project';

const Repositories = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const org = location.state?.orgs
  
  const { data: repos, refetch } = useGetReposQuery(org, {
    skip: !org,
  });
  const [cloneRepo] = useCloneRepoMutation();
  const [deleteRepo] = useDeleteRepoMutation();
  const [createProject] = useCreateProjectMutation();

  const [filterText, setFilterText] = useState('');

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
  
  const handleRepoClick = async (name, id, org) => {
    setTimeout(async () => {
      await createProject({ id });
      navigate(`/work/${name}`, { state: { id, name, org } });
    }, 0);
  };
  
  const handleCloneClick = (orgName, repoName, e) => {
    e.stopPropagation();
    cloneRepo({ orgName, repoName }).then(response => {
      if (response.data) {
        navigator.clipboard.writeText(response.data.clone_url)
          .then(() => {
            alert('클론 URL이 클립보드에 복사되었습니다!');
          })
          .catch(err => {
            console.error('클립보드 복사 실패:', err);
          });
      }
    });
  };

  const handleDeleteClick = async (orgName, repoName, e) => {
    e.stopPropagation();
    if (window.confirm(`정말로 ${repoName} 레포지토리를 삭제하시겠습니까?`)) {
      try {
        await deleteRepo({ orgName, repoName });
        alert(`${repoName} 레포지토리가 삭제되었습니다.`);
        refetch();  // 삭제 후 레포지토리 목록 다시 불러오기
      } catch (error) {
        console.error('레포지토리 삭제 중 오류 발생:', error);
        alert('레포지토리 삭제에 실패했습니다.');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredRepos = filterText
    ? repos?.filter(repo =>
        repo.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : repos;

  return (
    <Home id='repositories'>
      <div className='repositories__inner'>
        <div className='repositories__header'>
          <input type="text" placeholder='Find a repository...' onChange={handleFilterChange} />
          <CreateBtn onClick={createClick} />
        </div>
        <div className='repositories__container'>
          {filteredRepos && filteredRepos.map((repo, key) => (
            <article key={key} className='repositories' onClick={() => handleRepoClick(repo.name, repo.id, org)}>
              <div className='repositories__top'>
                <h3>{repo.name}</h3>
                <span>{repo.visibility}</span>
                <button onClick={(e) => handleCloneClick(org, repo.name, e)}><BsCopy color='white' /></button>
<<<<<<< HEAD
                <button onClick={(e) => handleDeleteClick(org, repo.name, e)}>삭제</button>
=======
>>>>>>> c01d94e6338780693836577ce8e334838079e3d9
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
