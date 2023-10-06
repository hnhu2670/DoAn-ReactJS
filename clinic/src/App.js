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
// import Dangky from './user/patient/Dangky'
import Home from './components/Home';
import DatLichKham from './user/patient/DatLichKham';
import Update from './components/MyProfile';
import DKLam from './user/doctor/DKLam';
import XNKham from './user/nurse/XNLichKham';
import ForgetPassword from './components/ForgetPassword';
import Chat from "./Chat"
import LichKham from "./user/doctor/LichKham"
import PhieuKham from './user/doctor/PhieuKham';
import Pay from './paypal/PayPal'
import LichSuKham from './user/doctor/LichSuKham';
import Thuoc from './user/doctor/Thuoc';
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
            {/* <Route path="/datlich" exact element={<Dangky />} /> */}
            <Route path="/dangky" exact element={<Register />} />
            <Route path="/datlai" exact element={<ResetPass />} />
            <Route path="/xacnhanotp" exact element={<OTPPage />} />
            <Route path="/xemlich" exact element={<Lichsudangky />} />
            <Route path="/bacsi" exact element={<Doctor />} />
            <Route path="/bacsi/:id" exact element={<Profile_doctor />} />
            <Route path="/trangcanhan" exact element={<Update />} />
            <Route path="/datlichkham" exact element={<DatLichKham />} />
            <Route path="/dangkylam" exact element={<DKLam />} />
            {/* xác nhận lịch khám */}
            <Route path="/xacnhanlich" exact element={<XNKham />} />
            {/* lịch khám */}
            <Route path="/xemlichkham" exact element={<LichKham />} />
            {/* khám bệnh */}
            <Route path="/xemlichkham/khambenh/:id/phieukham" exact element={<PhieuKham />} />
            <Route path='/quenmatkhau' exact element={<ForgetPassword />} />
            {/* thanh toán */}
            <Route path="/thanhtoan" exact element={<Pay />} />
            {/* lịch sử khám của bệnh nhân */}
            <Route path="/xemlichkham/:id" exact element={<LichSuKham />} />
            {/* thuốc */}
            <Route path="/xemlichkham/phieukham/:id/kethuoc" exact element={<Thuoc />} />

          </Routes>
          <Chat />
          <Footer />



        </div>

      </BrowserRouter>

    </MyUserContext.Provider>

  );
}

export default App;
