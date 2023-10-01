import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useReducer } from 'react';
import cookie from "react-cookies";
import MyUserReducer from './reducer/MyUserReducer';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Register from './components/Register'
import ResetPass from './components/ResetPass'
import OTPPage from './components/OTPPage'
import Lichsudangky from './components/Lichsudangky'
import Login from './components/Login'
import Doctor from './doctor/Doctors';
import Profile_doctor from './doctor/Profile_doctor';
import Dangky from './user/patient/Dangky'
import Home from './components/Home';
import DatLichKham from './user/patient/DatLichKham';
import Update from './components/MyProfile';
import DKLam from './user/doctor/DKLam';
import XNKham from './user/nurse/XNLichKham';
import CheckDk from './components/CheckDk'
import ForgetPassword from './components/ForgetPassword';
import Navbar from './components/Navbar';
// import Signin from './components/Signin';
export const MyUserContext = createContext();
function App() {

  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/datlich" exact element={<Dangky />} />
            <Route path="/dangky" exact element={<Register />} />
            <Route path="/datlai" exact element={<ResetPass />} />
            <Route path="/xacnhanotp" exact element={<OTPPage />} />
            <Route path="/xemlich" exact element={<Lichsudangky />} />
            <Route path="/bacsi" exact element={<Doctor />} />
            <Route path="/bacsi/:id" exact element={<Profile_doctor />} />
            <Route path="/trangcanhan" exact element={<Update />} />
            <Route path="/datlichkham" exact element={<DatLichKham />} />
            <Route path="/dangkylam" exact element={<DKLam />} />
            <Route path="/xacnhanlich" exact element={<XNKham />} />
            <Route path="/checkdk" exact element={<CheckDk />} />
            <Route path='/quenmatkhau' exact element={<ForgetPassword />} />
            <Route path='/navbar' exact element={<Navbar />} />
            <Route path='/chatroom' exact element={<ChatRoom />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>

    </MyUserContext.Provider>

  );
}

export default App;
