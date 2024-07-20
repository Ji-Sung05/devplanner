import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import {  AuthProvider } from './components/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Routes>
        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
        
        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
