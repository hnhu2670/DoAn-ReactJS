import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useReducer } from 'react';
import cookie from "react-cookies";
import MyUserReducer from './reducer/MyUserReducer';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Register from './components/Register'
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
import LichKham from "./user/doctor/LichKham"
import PhieuKham from './user/doctor/PhieuKham';
import LichSuKham from './user/doctor/LichSuKham';
import ThanhToan from './user/nurse/ThanhToan';
import ToaThuoc from './user/doctor/ToaThuoc';
import DanhGia from './user/patient/DanhGia';
import KeThuoc from './user/doctor/KeThuoc';
import MyUserAddBill from './reducer/MyUserAddBill';
import ThongBao from './user/nurse/ThongBao';
import AllChatBox from './chat/AllChat';
import NewChat from './chat/NewChat';
export const MyUserContext = createContext();
export const MyNotiContext = createContext()
function App() {

  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  const [notiCount, notiDispatch] = useReducer(MyUserAddBill, 0)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <MyNotiContext.Provider value={[notiCount, notiDispatch]}>
        <BrowserRouter>

          <Header />
          <Routes>
            <Route path="/ClinicReact" exact element={<Home />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/dangky" exact element={<Register />} />
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
            <Route path='/thanhtoan/:id' exact element={<ThanhToan />} />
            {/* lịch sử khám của bệnh nhân */}
            <Route path="/xemlichkham/:id" exact element={<LichSuKham />} />
            {/* thuốc */}
            <Route path="/xemlichkham/phieukham/:id/kethuoc" exact element={<KeThuoc />} />
            {/* toa thuốc */}
            <Route path="/kethuoc/toathuoc/:id" exact element={<ToaThuoc />} />
            {/* đánh giá */}
            <Route path="/danhgia/:id" exact element={<DanhGia />} />
            {/* thong bao */}
            <Route path="/thongbao" exact element={<ThongBao />} />

            <Route path="/allchat" element={<AllChatBox />} />
            <Route path="/chat/:username" element={<NewChat />} />

          </Routes>

          <Footer />

        </BrowserRouter>
      </MyNotiContext.Provider>
    </MyUserContext.Provider>

  );
}

export default App;
