import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4000'
  const navigate = useNavigate();
  const loginForm = (e) => {
    e.preventDefault();
    window.location.href = `${baseUrl}/auth`;
    navigate('/home');
  }
  return (
    <section id='login__container'>
      <div className='login__inner'>
        <h1 className='login__h1'>로그인</h1>
        <form onSubmit={loginForm}>
          <div className='login__button'>
            <IoLogoGithub color='white' />
            <button>Github 계정으로 로그인</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login