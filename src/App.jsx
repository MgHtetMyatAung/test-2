import React from 'react';
import { Route, Routes } from 'react-router';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ProtectPage from './components/ProtectPage/ProtectPage';
import AddToCard from './pages/AddToCard';
import CheckOut from './pages/CheckOut';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/checkout' element={<ProtectPage><CheckOut/></ProtectPage>}/>
          <Route path='/addtocard' element={<AddToCard/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App;