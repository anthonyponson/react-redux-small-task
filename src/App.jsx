import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Form from './Form';
import { useSelector } from 'react-redux';
import stateSlice from './stateSlice';

const App = () => {
  const isLoggedIn = useSelector(state => state.name.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route
          path="/form"
          element={isLoggedIn ? <Form /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
