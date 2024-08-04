import React from 'react'
import { useFetchCommitsQuery } from '../app/project'

const Commit = ({ repoName, orgName }) => {
  console.log(repoName, orgName)
  const { data: commits, error, isLoading } = useFetchCommitsQuery({orgName, repoName })
  console.log(commits)
  return (
    <div>
      1
    </div>
  )
}

export default Commit