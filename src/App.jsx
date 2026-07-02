import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import TaskItem from './components/TaskItem';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import TaskProvider from './context/TaskProvider';
import AuthProvider from './context/AuthProvider';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <TaskProvider>

            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register/>} />

              <Route path='/' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
              <Route path='/tasks' element={<ProtectedRoute> <Tasks /> </ProtectedRoute> } />
              <Route path='/addtask' element={<ProtectedRoute> <TaskForm /> </ProtectedRoute> } />

              <Route path='*' element={<PageNotFound/>} />

            </Routes>

          </TaskProvider>
        </AuthProvider>
      </BrowserRouter>

      {/* <TaskItem/> */}

    </>
  )
}

export default App
