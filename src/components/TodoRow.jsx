import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const TodoRow = ({ data, del }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div>
              <FaRegCheckCircle />
              <span>{data.todo}</span>
            </div>
          </td>
          <td>
            <div>
              <span>{data.endDate.slice(0, 10)}</span>
              <FaRegTrashAlt style={{ cursor: 'pointer' }} color='white' onClick={() => del(data._id)} /> 
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TodoRow