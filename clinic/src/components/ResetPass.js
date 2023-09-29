import React, { useState } from 'react';
import axios from 'axios';
 

const ResetPass = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Gửi yêu cầu kiểm tra tên người dùng trong API
        axios.post('register', { username })
          .then((response) => {
            // Kiểm tra nếu tên người dùng tồn tại trong API
            if (response.data.userExists) {
              // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
              if (password === confirmPassword) {
                // Gửi yêu cầu cập nhật mật khẩu mới trong API
                axios.post('register', { username, password })
                  .then(() => {
                    alert('Mật khẩu đã được cập nhật thành công!');
                  })
                  .catch(() => {
                    alert('Đã xảy ra lỗi khi cập nhật mật khẩu!');
                  });
              } else {
                alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
              }
            } else {
              alert('Tên người dùng không tồn tại!');
            }
          })
          .catch(() => {
            alert('Đã xảy ra lỗi khi kiểm tra tên người dùng!');
          });
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
              <h3>ĐẶT LẠI MẬT KHẨU </h3>
              
        {/* <label>
          Tên người dùng:
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label> */}
        <br /><br />
        <label>
          Mật khẩu mới:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br /><br />
        <label>
          Xác nhận mật khẩu mới:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </label>
        <br /><br />
        <button type="submit">Đặt lại mật khẩu</button>
       
               
            </div>
          </div>
        </div>
      </form>
            
        </>
    );
};

export default ResetPass;