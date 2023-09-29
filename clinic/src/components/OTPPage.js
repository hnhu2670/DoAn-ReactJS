import React, { useState } from 'react';

const OTPPage = () => {
    const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setOTP(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra mã OTP ở đây
    if (otp === '123456') {
      setMessage('Mã OTP hợp lệ!');
    } else {
      setMessage('Mã OTP không hợp lệ!');
    }
};
    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="border">
          <div className="login">
            <div className="img_login">
              <img src="https://res.cloudinary.com/dstqvlt8d/image/upload/v1691914443/Login_Web_Animation_fhmgp8.png" alt="alert" />
            </div>
            <div className="mainLogin">
              <h3>Nhập OTP</h3>
              
       
        <br /><br />
        <label>
          Nhập OTP:
          <input  type="text" value={otp} onChange={handleChange} required />
        </label>
        <br /><br />
        <button type="submit">Gửi OTP</button>  
            </div>
            <p>{message}</p>
          </div>
        </div>
      </form>
            
        </>
    );
};

export default OTPPage;