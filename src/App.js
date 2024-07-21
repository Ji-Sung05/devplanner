import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import {  AuthProvider } from './components/AuthContext';
import Organization from './pages/Organization';
import Stars from './pages/Stars';
import Repositories from './pages/Repositories';

function App() {

  return (
    <AuthProvider>
      <Routes>
        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/organization' element={<Organization />} />
          <Route path='/repositories' element={<Repositories />} />
          <Route path='/stars' element={<Stars />} />
        </Route>
        
        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes />}>
          <Route path='/' element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
