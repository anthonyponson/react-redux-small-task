import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTask, editTask } from './stateSlice';

const Home = () => {
  const dispatch = useDispatch();
  const forms = useSelector(state => state.name.forms);
  const navigate = useNavigate();

  const form = () => {
    navigate('/form');
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (task, index) => {
    dispatch(editTask([task, index]));
    navigate('/form', { state: { task } }); // pass task object as state
  };

  return (
    <>
      <div>
        {forms.map((task, index) => (
          <ul key={index}>
            <li>
              {task.name} : {task.description} -{' '}
              <input type='checkbox' checked={task.isComplete} />
              <label>{task.isComplete ? 'completed' : 'not completed'}</label>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleEdit(task, index)}>Edit</button>
            </li>
          </ul>
        ))}

        <button onClick={() => form()}>Go to Form</button>
      </div>
    </>
  );
};

export default Home;