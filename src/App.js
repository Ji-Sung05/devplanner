import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import { AuthProvider } from './components/AuthContext';
import { AuthContext } from './components/AuthContext';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Organization from './pages/Organization';
import Repositories from './pages/Repositories';
import CreateRepo from './pages/CreateRepo';
import Work from './pages/Work';
import Manual from './pages/Manual';

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Routes>
        {isAuth ? (
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/organization' element={<Organization />} />
          <Route path='/repositories' element={<Repositories />} />
          <Route path='/create-repo' element={<CreateRepo />} />
          <Route path='/work/:repo' element={<Work />} />
          <Route path='/manual' element={<Manual />} />
        </Route>
        ) : (
          <Route path='/' element={<Login />} />
        )}
      </Routes>
    </AuthProvider>
  );
}

export default App;
