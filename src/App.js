import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import {  AuthProvider } from './components/AuthContext';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Organization from './pages/Organization';
import Repositories from './pages/Repositories';
import CreateRepo from './pages/CreateRepo';
import Work from './pages/Work';
import Manual from './pages/Manual';

function App() {

  return (
    <AuthProvider>
      <Routes>
        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/organization' element={<Organization />} />
          <Route path='/repositories' element={<Repositories />} />
          <Route path='/create-repo' element={<CreateRepo />} />
          <Route path='/work/:repo' element={<Work />} />
          <Route path='/manual' element={<Manual />} />
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
