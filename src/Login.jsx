import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login} from './stateSlice'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const state = useSelector(({name}) => name)
  const dispatch = useDispatch() 

  const navigate = useNavigate()

const userNameChange = (e) => {
    if (e.target.name === 'name') {
      setUserName(e.target.value)
    } else {
      setUserPassword(e.target.value)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (userName === '' || userPassword === '') return

    const user = state.userData.find(
      (item) => item.username === userName && item.password === userPassword
    )
    
    if (user) {
      navigate('/form')
    } else {
      setShowPopup(!user)
    }
  }

  const gotoHome = () => {
    navigate('/home')
  }

  return (
    <div>
      <button
        className="border-2 border-green-400 rounded-full px-4 py-1 space-y-12 my-6"
        onClick={gotoHome}
      >
        goto home
      </button>
      <div>
        <form
          className="bg-emerland-500 w-1/2 flex items-center justify-center m-auto flex-col rounded-lg py-12"
          onSubmit={handleClick}
        >
          <label className="text-blue">Username </label>
          <input
            className="rounded-full m-2"
            value={userName}
            name="name"
            onChange={userNameChange}
            type="text"
          />
          {userName === '' && showPopup && <div> user name is required</div>}
          <label>Password</label>
          <input
            className=" rounded-full m-2"
            value={userPassword}
            name="password"
            onChange={userNameChange}
            type="password"
          />
          {userPassword === '' && showPopup && (
            <div> user password is required</div>
          )}
          <input
            type="submit"
            className="bg-white-400 p-2 px-6 mt-2 rounded-full mx-2"
            onClick={() =>{
              localStorage.setItem('isLoggedIn', JSON.stringify(true))
               dispatch((login(true)))
            
            }}
          />
          {/* <button onClick={() => dispatch({ type: 'login', payload: true })}>
          Login
        </button> */}
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>Invalid username or password</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
