import React, { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import './App.scss';
import { USER } from './types/UserType';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import Footer from './components/footer/Footer';
import ScrollButton from './components/buttons/scroll-button/ScrollButton';
import LoginPage from './pages/login-page/LoginPage';
import { ToastContainer } from 'react-toastify';
import SignUpPage from './pages/signup-page/signUpPage';

interface USER_CONTEXT {
  user: USER | undefined,
  setUser: Dispatch<SetStateAction<USER | undefined>>
}

export const userContext = createContext<USER_CONTEXT>({
  user: undefined,
  setUser: () => { }
})

function App() {
  const [user, setUser] = useState<USER>()

  const userValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  )
  return (
    <>
      <userContext.Provider value={userValue}>
        <Navbar />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/log-in' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignUpPage />}></Route>
        </Routes>

        <ScrollButton />
        <Footer />
      </userContext.Provider>
    </>
  )
}

export default App;
