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
import AboutPage from './pages/about-page/AboutPage';
import BlogPage from './pages/blog-page/BlogPage';
import PostPage from './pages/blog-page/post-page/PostPage';
import Error404 from './pages/404-page/Error404';
import AddPostPage from './pages/blog-page/add-post-page/AddPostPage';
import EditPostPage from './pages/blog-page/edit-post-page/EditePostPage';
import CocktailsPage from './pages/cocktails-page/CocktailsPage';
import CocktailPage from './pages/cocktails-page/cocktail-page/CocktailPage';
import AddCocktailPage from './pages/cocktails-page/add-cocktail-page/AddCocktailPage';
import EditCocktailPage from './pages/cocktails-page/edit-cocktail-page/EditCocktailPage';
import BarsPage from './pages/bars-page/BarsPage';
import BarPage from './pages/bars-page/bar-page/BarPage';
import AddReservationPage from './pages/bars-page/add-reservation-page/AddReservationPage';
import AddBarPage from './pages/bars-page/add-bar-page/Add BarPage';
import EditBarPage from './pages/bars-page/edit-bar-page/EditBarPage';

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
          <Route path='/' element={<HomePage />} />
          <Route path='/log-in' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path="/blog/add" element={<AddPostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path='/post/:id/edit' element={<EditPostPage />} />
          <Route path='/cocktails' element={<CocktailsPage />} />
          <Route path='/cocktails/add' element={<AddCocktailPage />} />
          <Route path='/cocktail/:id' element={<CocktailPage />} />
          <Route path='/cocktail/:id/edit' element={<EditCocktailPage />} />
          <Route path='/bars' element={<BarsPage />} />
          <Route path='/bars/add' element={<AddBarPage />} />
          <Route path='/bar/:id' element={<BarPage />} />
          <Route path='/bar/:id/edit' element={<EditBarPage />} />
          <Route path='/reservations/add' element={<AddReservationPage />} />

          <Route path='/404' element={<Error404 />} />
        </Routes>

        <ScrollButton />
        <Footer />
      </userContext.Provider>
    </>
  )
}

export default App;
