import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { stateContext } from './Context'
import { addTask, edit, editTask, tasks } from './stateSlice'
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
      dispatch(editTask([newTask, task.id])) // dispatch editTask action for edited task
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
    <div>
      <form onSubmit={submitHandle}>
        <input name='name' value={taskName} onChange={sameInput}></input>

        <input name='des' value={taskDes} onChange={sameInput}></input>

        <input checked={checked} onChange={checking} type='checkbox'></input>
        <input type='submit' />
        <button onClick={() => Home()}>Go To Home</button>
      </form>
    </div>
  )
}

export default Form
