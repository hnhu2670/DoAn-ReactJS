// import React, { useState } from 'react';
// import "../Style/style.css";
// const Signin = () => {
//   const [user, setUser] = useState({
//     "firstName": "",
//     "lastName": "",
//     "username": "",
//     "password": "",
//     "confirmPass": "",
//     "email": "",
//     "phone": ""
// });
//     return (
//          <>
//          <div className='border'>
//          <div className="img_signin">
//             <img src="https://res.cloudinary.com/dstqvlt8d/image/upload/v1691914443/Login_Web_Animation_fhmgp8.png" alt="alert"/>
//         </div>
//             <div className='signin'> 
//          <h1>Đăng ký tài khoản</h1>
//   <form className='contentsignin'>
    
//     <div className='contentsignin1'> 

//     <div className="form-group">
//       <label htmlFor="username">Tên đăng nhập:</label>
//       <input type="text" id="username" name="username" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="password">Mật khẩu:</label>
//       <input type="password" id="password" name="password" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="role">Chức vụ:</label>
//       <select id="role" name="role">
//         <option value="admin">Admin</option>
//         <option value="user">User</option>
//       </select>
//     </div>
    
//     <div class="form-group">
//       <label htmlFor="fullname">Tên thật:</label>
//       <input type="text" id="fullname" name="fullname" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="avatar">Avatar:</label>
//       <input type="file" id="avatar" name="avatar"/>
//     </div>
//     </div>
//     <div className='contentsignin1'>
//     <div className="form-group">
//       <label htmlFor="phone">Số điện thoại:</label>
//       <input type="tel" id="phone" name="phone" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="email">Email:</label>
//       <input type="email" id="email" name="email" required/>
//     </div>
//     <div className="form-group">
//       <label for="address">Địa chỉ:</label>
//       <input type="text" id="address" name="address" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="birthdate">Ngày tháng năm sinh:</label>
//       <input type="date" id="birthdate" name="birthdate" required/>
//     </div>
//     <div className="form-group">
//       <label htmlFor="gender">Giới tính:</label>
//       <select id="gender" name="gender">
//         <option value="male">Nam</option>
//         <option value="female">Nữ</option>
//         <option value="other">Khác</option>
//       </select>
//     </div>
//     <button className='buttondangky' type="submit">Đăng ký</button>
//     </div>
//   </form>
//   </div>
//   </div>
//          </>
//     );
// };

// export default Signin;
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/apis";
import { Button, Form } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import "../Style/style.css";
//import NurseBooking from '../image/Healthcare Female Doctor Nurse Posing Uniform Stethoscope PNG.png';

const Booking = () => {
  const [appointment, setAppointment] = useState({
    
    date: "",
     
  });

  const [loading, setLoading] = useState(false);
    
    let nav = useNavigate();

    const change = (evt, field) => {
      setAppointment(current => {
            return {...current, [field]: evt.target.value}
        })
    }

    const booking = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let formData = new FormData();
            formData.append("date", appointment.date); 
            
            
            console.log(formData);
            setLoading(true)
            let res = await Apis.post(endpoints['booking'], formData);
            console.log("thanh cong");
            if (res.status === 201) {
                nav("/");
            }
        }

        process(); 
    }

  return <>
  <div className='border'>
   
      <div className='signin'> 
       <h1>Đăng ký tài khoản</h1>
        
      <Form onSubmit={booking} className='contentsignin'>
       
          <div className='contentsignin1'>
           
           
          <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="date"  value={appointment.appointmentDate} onChange={e => change(e, "date")}   />
              <Form.Control.Feedback type="invalid">
                  Vui lòng nhập địa chỉ!!!
              </Form.Control.Feedback>
          </Form.Group>
         
          
           
           
          <Form.Group className="mb-3">
              {loading === true?<MySpinner />:<Button type="submit" variant="danger">Đăng ký</Button>}
              
          </Form.Group>
          </div>
      </Form>
       
  </div>
  </div>
  </>
}

export default Booking;
     