import React from 'react'
import { RiFileAddLine } from "react-icons/ri";

const CreateBtn = (props) => {

  return (
    <button className='createBtn' onClick={props.onClick}>
      <RiFileAddLine size={17} />
      New
    </button>
  )
}

export default CreateBtn