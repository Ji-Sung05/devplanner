import React from 'react'

const CommitCard = ({ commit }) => {
  return (
    <div id='commitCard'>
      <div className='commitCard__top'>{commit.commit.message}</div>
      <div className='commitCard__bottom'>
        <div className='bottom__img'>
          <img src={commit.author?.avatar_url} alt="프로필 사진" />
        </div>
        <span className='bottom__name'>{commit.author?.login}</span>
        <span className='bottom__date'>{new Date(commit.commit.author.date).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default CommitCard