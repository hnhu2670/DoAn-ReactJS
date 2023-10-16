import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Row } from 'react-bootstrap';
import Apis, { authApi, endpoints } from '../configs/apis';
import cookie from 'react-cookies';
import { MyUserContext } from '../App';
import jwt_decode from "jwt-decode";
import "../resources/css/login.css"
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import MySpinner from '../layout/MySpinner';
// import { IconName } from "react-icons/fa";
// import { FontAwesomeIcon } from "react-fontawesome"

const Login = () => {



  const [user, dispatch] = useContext(MyUserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState([])
  // const [role, setRole] = useState('');
  const nav = useNavigate();
  const [error, setError] = useState('');

  const loginGoogle = async (decoded) => {

    console.log("jgjjhjh");
    let form = new FormData();
    form.append("avatar", decoded.picture);
    form.append("username", decoded.email);
    form.append("firstname", decoded.family_name);
    form.append("lastname", decoded.given_name);
    // form.append("phonenumber","");
    // form.append("location", "");
    form.append("email", decoded.email);

    try {
      let res = await Apis.post(endpoints["login-google"], form);
      cookie.save("token", res.data);    //lưu cái res.data kia bằng biến token vào cookie 

      let { data } = await authApi().get(endpoints['current-user']);
      cookie.save("user", data); //lưu cái data kia bằng biến user vào cookie 

      dispatch({
        "type": "login",
        "payload": data
      });
    } catch (err) {
      // notify(err.request.responseText)
      console.log(err);
    }

  }

  const login = async (evt, action) => {
    evt.preventDefault();

    if (!username || !password) {
      setError('Tên đăng nhập và mật khẩu không được để trống');
      return;
    }

    try {
      setLoading(true)
      let res = await Apis.post(endpoints['login'], {
        username: username,
        password: password,
      });
      cookie.save('token', res.data);
      console.log(res.data);
      let { data } = await authApi().get(endpoints['current-user']);
      cookie.save('user', data);
      console.info(data);

      // console.log(data.roleId)
      // console.log(username)
      dispatch({
        type: 'login',
        payload: data
      });



    } catch (err) {
      setLoading(false)
      console.log(err)
      if (err.response && err.response.status === 401) {
        setError("Tên tài khoản không tồn tại");
      } else {
        setError(err.response.data);
      }
    }
  };

  if (user !== null) {
    return (<>
      <Navigate to="/" />
      {/* CheckLogin() */}
    </>
    );
  }


  return (
    <>
      <section className='section-login'>
        <form onSubmit={login}>
          <div className="border">
            <div className="login">

              <div className="mainLogin">
                {error && <Alert className='w-90 mr-10 ml-10 text-danger'>{error}</Alert>}
                <div className="form-login">
                  <h1 className="text-center text-login top-text">LOGIN</h1>
                  <Row className="mb-3">
                    <div className="Logincontent logincontent1">
                      <label htmlFor="username">Tên đăng nhập</label>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        className='input-login'
                        placeholder="Nhập username..."
                        name="username"
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-4">
                    <div className="Logincontent logincontent2">
                      <label htmlFor="pwd">Mật khẩu</label>

                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        id="pwd"
                        className='input-login'
                        placeholder="Nhập mật khẩu..."
                        name="password"
                        required />
                    </div>
                  </Row>
                  <Row className="mb-4">
                    <Link to="/quenmatkhau" className='text-white text-right'>
                      <i> <u>Quên mật khẩu</u></i>
                    </Link>
                  </Row>
                  <Row className="mb-4">
                    <div className="buttonLogin">
                      {loading === true ? <MySpinner /> :
                        <Button type="submit" className="buttonLoginColor">
                          Đăng nhập
                        </Button>
                      }

                    </div>
                  </Row>

                  <Row>
                    <h2 className='text-center mb-4 text-white'>HOẶC</h2>
                  </Row>
                  <Row className="mb-3">
                    <div className='text-center w-full'>
                      <GoogleOAuthProvider clientId="852352451720-t84v78jbcd5f8st240i16cfij5jljon2.apps.googleusercontent.com">
                        <GoogleLogin onSubmit
                          className="login_google"
                          clientId="852352451720-t84v78jbcd5f8st240i16cfij5jljon2.apps.googleusercontent.com"
                          onSuccess={(credentialResponse) => {
                            // console.log("Đăng nhập thành công", credentialResponse.credential);
                            var token = credentialResponse.credential;
                            var decoded = jwt_decode(token);
                            console.log(decoded);
                            loginGoogle(decoded);

                          }}
                          onFailure={(error) => {
                            console.log("Đăng nhập không thành công", error);

                          }}
                          redirectUri="http://localhost:3000"
                        />
                      </GoogleOAuthProvider>
                    </div>

                  </Row>

                </div>

              </div>
            </div>
          </div>
        </form>
      </section >

    </>
  );
};

export default Login;