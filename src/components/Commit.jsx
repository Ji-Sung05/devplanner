import React, { useEffect, useState } from 'react'
import { useFetchCommitsQuery } from '../app/project'
import CommitCard from './CommitCard'

const Commit = ({ repoName, orgName }) => {
  const [data, setData] = useState([])
  const { data: commits } = useFetchCommitsQuery({orgName, repoName })
  useEffect(() => {
    if (commits && commits.length > 0) {
      setData(commits)
    }
  }, [commits]);
  
  return (
    <div id='commit'>
      <div className='commit__inner'>
        <h3>Commits</h3>
        <hr />
        <div>
          {data.length > 0 ? (
            data.map((commit, i) => (
              <a href={commit.html_url} target='_blank' rel="noopener noreferrer" key={i}>
                <CommitCard commit={commit} />
              </a>
            ))
          ) : (
            <div>커밋이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Commit