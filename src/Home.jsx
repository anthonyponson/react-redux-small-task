import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteTask, editTask } from './stateSlice'

const Home = () => {
  const dispatch = useDispatch()
  const forms = useSelector((state) => state.name.forms)
  const navigate = useNavigate()

  const form = () => {
    navigate('/form')
  }

  const handleDelete = (index) => {
    dispatch(deleteTask(index))
  }

  const handleEdit = (task, index) => {
    dispatch(editTask([task, index]))
    navigate('/form', { state: { task } }) // pass task object as state
  }

  return (
    <>
      <div className='bg-emerald-400 flex flex-col items-center justify-center '>
        <button
          className='bg-neutral-50 rounded-full p-1 px-2 py-2 w-28 my-4'
          onClick={() => form()}
        >
          Go to Form
        </button>
        {forms.map((task, index) => (
          <div className='w-1/2 flex flex-col items-center justify-center'>
            <ul key={index}>
              <li className='m-2 p-2'>
                {task.name} : {task.description} -{' '}
                <input type='checkbox' checked={task.isComplete} />
                <label>{task.isComplete ? 'completed' : 'not completed'}</label>
                <button
                  className='bg-neutral-50 rounded-full p-1 px-4 mx-4'
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <button
                  className='bg-neutral-50 rounded-full p-1 px-4 mx-4'
                  onClick={() => handleEdit(task, index)}
                >
                  Edit
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
