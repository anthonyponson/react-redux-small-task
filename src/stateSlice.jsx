import { createSlice } from '@reduxjs/toolkit'

export const stateSlice = createSlice({
  name: 'name',
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    forms: [],
    userData: [
      {
        id: 1,
        username: 'tony',
        password: '123',
      },
      {
        id: 2,
        username: 'stark',
        password: '123',
      },
    ],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setForms: (state, action) => {
      state.forms = action.payload
    },
    deleteTask: (state, action) => {
      state.forms.splice(action.payload, 1);
    },
    addTask: (state, action) => {
      state.forms.push(action.payload);
    },
    editTask: (state, action) => {
      const [newTask, id] = action.payload;
      const taskIndex = state.forms.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.forms[taskIndex] = { ...state.forms[taskIndex], ...newTask };
      }
    },

    toggleComplete: (state, action) => {
      state.forms[action.payload].isComplete = !state.forms[action.payload].isComplete;
    },
    tasks: (state) => {
      // do something with tasks
    },
  },
})

export const { login, setForms, edit, addTask, editTask,deleteTask, toggleComplete, tasks } = stateSlice.actions

export default stateSlice.reducer


