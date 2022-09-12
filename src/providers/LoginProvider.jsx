import React, { useState } from 'react'
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export const LoginProvider = ({ children }) => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    user: "",
    password: ""
  })

  const onChangeFormState = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const postLogin = () => {
    if (formState.user === 'admin' && formState.password === 'admin') {
      navigate('/people');
    } else {
      alert('not login')
    }
  }

  return (
    <LoginContext.Provider
      value={{
        formState,
        onChangeFormState,
        postLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
