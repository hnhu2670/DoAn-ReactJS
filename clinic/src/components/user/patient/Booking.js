// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apis, { endpoints } from '../configs/apis';
// import { Button, Form } from 'react-bootstrap';
// import MySpinner from '../layout/MySpinner';

// const Booking = () => {
//     const [appointment, setAppointment] = useState({
//         sickpersonId:6,
//         appointmentDate: "",
//         appointmentTime: "",
         
//       });
    
//       const [loading, setLoading] = useState(false);
        
//         let nav = useNavigate();
    
//         const change = (evt, field) => {
//           setAppointment(current => {
//                 return {...current, [field]: evt.target.value}
//             })
//         }
    
//         const booking = (evt) => {
//             evt.preventDefault();
    
//             const process = async () => {
//                 let formData = new FormData();
//                 formData.append("appointmentDate",appointment.appointmentDate); 
//                 formData.append("sickpersonId",appointment.sickpersonId);
//                 formData.append("appointmentTime",appointment.appointmentTime);
                
                
//                 console.log(formData);
                
//                 setLoading(true)
//                 console.log("thanh cong");
//                 let res = await apis.post(endpoints['booking'], formData);
//                 console.log("thanh cong");
//                 if (res.status === 200) {
//                     nav("/");
//                 }
//             }
    
//             process(); 
//         }
//     return (
//         <>
//         <div className='border'>
         
//             <div className='signin'> 
//              <h1>Đăng ký tài khoản</h1>
              
//             <Form onSubmit={booking} className='contentsignin'>
             
//                 <div className='contentsignin1'>
                 
                 
//                 <Form.Group className="mb-3">
//                     <Form.Label>Địa chỉ</Form.Label>
//                     <Form.Control type="date"  value={appointment.appointmentDate} onChange={e => change(e, "appointmentDate")}   />
//                     <Form.Control.Feedback type="invalid">
//                         Vui lòng nhập địa chỉ!!!
//                     </Form.Control.Feedback>
//                 </Form.Group>
//                 {/* <Form.Group className="mb-3">
//                     <Form.Label>Địa chỉ</Form.Label>
//                     <Form.Control type="time"  value={appointment.appointmentTime} onChange={e => change(e, "appointmentTime")}   />
//                     <Form.Control.Feedback type="invalid">
//                         Vui lòng nhập địa chỉ!!!
//                     </Form.Control.Feedback>
//                 </Form.Group> */}

//                 {/* <></> */}
//                 <Form.Group className="mb-3">
//                 <Form.Label>Thời Gian</Form.Label>
//                 <Form.Control as="select"  value={appointment.appointmentTime} onChange={e => change(e, "appointmentTime")}  >
                     
//                     <option>09:30:00</option>
//                     <option>10:00:00</option>
//                 </Form.Control>
//                 <Form.Control.Feedback type="invalid">
//                     Vui lòng chọn giới tính!!!
//                 </Form.Control.Feedback>
//             </Form.Group>

               
                
                 
                 
//                 <Form.Group className="mb-3">
//                     {loading === true?<MySpinner />:<Button type="submit" variant="danger">Đăng ký</Button>}
                    
//                 </Form.Group>
//                 </div>
//             </Form>
             
//         </div>
//         </div>
//         </>
//     );
// };

// export default Booking;




// --------------
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apis, { endpoints } from '../configs/apis';
// import { Button, Form } from 'react-bootstrap';
// import MySpinner from '../layout/MySpinner';

// const Booking = () => {
//     const [appointment, setAppointment] = useState({
//         sickpersonId:6,
//         appointmentDate: "",
//         appointmentTime: "",
         
//       });
    
//       const [loading, setLoading] = useState(false);
        
//         let nav = useNavigate();
    
//         const change = (evt, field) => {
//           setAppointment(current => {
//                 return {...current, [field]: evt.target.value}
//             })
//         }
    
//         const booking = (evt) => {
//             evt.preventDefault();
    
//             const process = async () => {
//                 let formData = new FormData();
//                 formData.append("appointmentDate",appointment.appointmentDate); 
//                 formData.append("sickpersonId",appointment.sickpersonId);
//                 formData.append("appointmentTime",appointment.appointmentTime);
                
                
//                 console.log(formData);
                
//                 setLoading(true)
//                 console.log("thanh cong");
//                 let res = await apis.post(endpoints['booking'], formData);
//                 console.log("thanh cong");
//                 if (res.status === 200) {
//                     nav("/");
//                 }
//             }
    
//             process(); 
//         }
//     return (
//         <>
//         <div className='border'>
         
//             <div className='signin'> 
//              <h1>Đăng ký tài khoản</h1>
              
//             <Form onSubmit={booking} className='contentsignin'>
             
//                 <div className='contentsignin1'>
                 
                 
//                 <Form.Group className="mb-3">
//                     <Form.Label>Địa chỉ</Form.Label>
//                     <Form.Control type="date"  value={appointment.appointmentDate} onChange={e => change(e, "appointmentDate")}   />
//                     <Form.Control.Feedback type="invalid">
//                         Vui lòng nhập địa chỉ!!!
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                 <Form.Label>Thời Gian</Form.Label>
//                 <Form.Control as="select" value={appointment.appointmentTime} onChange={e => change(e.target.value, "appointmentTime")}>
//                     <option value="09:30:00">09:30:00</option>
//                     <option value="10:00:00">10:00:00</option>
//                 </Form.Control>
//                 <Form.Control.Feedback type="invalid">
//                     Vui lòng chọn giới tính!!!
//                 </Form.Control.Feedback>
//             </Form.Group>

               
                
                 
                 
//                 <Form.Group className="mb-3">
//                     {loading === true?<MySpinner />:<Button type="submit" variant="danger">Đăng ký</Button>}
                    
//                 </Form.Group>
//                 </div>
//             </Form>
             
//         </div>
//         </div>
//         </>
//     );
// };

// export default Booking;