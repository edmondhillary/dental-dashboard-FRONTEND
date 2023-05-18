import { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './Components/NavBar/NavBar'
import { Routes } from '../src/Routes/Routes';
import Login from '../src/Components/auth/Login';
import { GlobalContext } from './context/UserContext/UsersState';
import { notification } from 'antd';
import {Header} from './Components/Header/Header';
import './App.scss'
import AddPatient from './Components/FixedButtons/AddPatient';


function App() {

  const { token, isSuccess, reset } = useContext(GlobalContext);
  useEffect(() => {

    reset()
  }, [isSuccess]);

  return (
    <div className="App">
  <BrowserRouter>
        {
          !token ?
            <Login /> :
            <>
              <NavBar className='navbar' />
              <AddPatient/>
                <div className='header-container'>
                <Header/>
                <Routes className='content' />
              </div>
            </>
        } 
      </BrowserRouter>

    </div>
  )
}

export default App
