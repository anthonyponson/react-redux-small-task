import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addTask, editTask, tasks } from './stateSlice'
import { useDispatch } from 'react-redux'

const Form = () => {
  const state = useSelector(({ name }) => name)
  console.log(state)
  const dispatch = useDispatch()

  const location = useLocation()
  const task = location.state?.task

  const [taskName, setTaskName] = useState(task?.name || '')
  const [taskDes, setTaskDes] = useState(task?.description || '')
  const [checked, setChecked] = useState(task?.isComplete || false)

  const sameInput = (e) => {
    if (e.target.name === 'name') {
      setTaskName(e.target.value)
    } else {
      setTaskDes(e.target.value)
    }
  }
  const checking = (e) => {
    setChecked(e.target.checked)
  }

  const submitHandle = (e) => {
    e.preventDefault()
    if (taskName === '' || taskDes === '') return
    let newTask = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDes,
      isComplete: checked,
    }
    if (task) {
      dispatch(editTask([newTask, task.id])) 
      dispatch(tasks())
    } else {
      dispatch(addTask(newTask))
    }
    setTaskName('')
    setTaskDes('')
    setChecked(false)
  }

  const navigation = useNavigate()

  const Home = () => {
    navigation('/home')
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='bg-emerald-400 flex flex-col space-y-4 p-6 rounded-lg' onSubmit={submitHandle}>
        <label className='text-neutral-50'>Task Name</label>     
        <input className='bg-neutral-100 rounded-full' name='name' value={taskName} onChange={sameInput}></input>
        <label className='text-neutral-50'>Task Description</label>
        <input className='bg-neutral-100 rounded-full' name='des' value={taskDes} onChange={sameInput}></input>

        <input checked={checked} onChange={checking} type='checkbox'></input>
        <input className='bg-neutral-50 rounded-full py-1  w-8/12 justify-center mx-auto cursor-pointer' type='submit' />
        <button className='bg-neutral-50 rounded-full py-1 w-8/12 justify-center mx-auto ' onClick={() => Home()}>Go To Home</button>
      </form>
    </div>
  )
}

export default Form
