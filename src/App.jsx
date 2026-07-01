import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import TaskItem from './components/TaskItem';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import TaskProvider from './context/TaskProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <TaskProvider>

          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/addtask' element={<TaskForm />} />



          </Routes>


        </TaskProvider>
      </BrowserRouter>

      {/* <TaskItem/> */}

    </>
  )
}

export default App
