import React from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Await, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axiosClient, { authApi, endpoints } from '../../api/axiosClient';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { auth } from '../firebase';
import apis, { endpoints, authApi } from './configs/apis';
// import './style.scss';

const ForgetPassword = () => {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const nav = useNavigate();
    const [err, setErr] = useState(null);
    const [user, setUser] = useState(false);
    const [ph, setPh] = useState("");
    const [otp, setOtp] = useState(null);
    const [isUserValid, setIsUserValid] = useState(true);
    const [isPhValid, setIsPhValid] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    //Fetch data
    const [isTenTK, setIsTenTK] = useState("");
    const [phone, setPhone] = useState("");
    //Sau khi xác nhận OTP thành công
    const [password, setPassword] = useState(true);
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [taiKhoan, setTaiKhoanState] = useState({
        "newPassword": "",
        "confirmNewPassword": "",
    })

    const change = (evt, field) => {
        setTaiKhoanState(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    //Xác nhận sđt và gửi otp qua sms
    const onSubmitSMS = async () => {
        // const appVerifier = window.recaptchaVerifier;
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSubmitSMS();
            },
            'expired-callback': () => { }
        });

        //Kiểm tra tên đăng nhập và số điện thoại truyền vào có null hay không
        if (ph === '' || ph.trim() === '' || username === '' || username.trim() === '') {
            setIsPhValid(false);
            setIsUserValid(false);
        } else {
            let formData = new FormData();
            formData.append("username", username);

            try {
                const res = await apis.post(endpoints['isUser'], formData);
                setIsTenTK(res.data.user);
                setPhone(res.data.phone);
                console.log(res.data.user);
                console.log(res.data.phone);

                //Nếu tên được gửi vào không trả về đối tượng nào
                if (res.data.user !== undefined) {
                    const formatP = "0" + ph.slice(2, 12);
                    console.log("Expect " + res.data.phone);
                    console.log("Input " + formatP);

                    //Nếu số điện thoại nhập vào không khớp với số điện thoại của người dùng đã đăng kí trước đó
                    if (res.data.phone === formatP) {
                        setLoading(true);
                        // onCaptchVerify();
                        const formatPh = "+" + ph;
                        // if (flag === true) {
                        console.log(">>>>>> Start Sign in phone ");
                        await signInWithPhoneNumber(auth, formatPh, appVerifier)
                            .then((confirmationResult) => {
                                window.confirmationResult = confirmationResult;
                                setLoading(false);
                                setShowOTP(true);
                                toast.success("Đã gửi OTP qua SMS!");
                            })
                            .catch((error) => {
                                console.log(error);
                                setLoading(false);
                                toast.success("Gửi OTP thất bại!");
                            });
                        console.log(">>>>>> End Sign in phone ");
                        // }
                    } else {
                        setLoading(false);
                        toast.error("Số điện thoại không đúng!!!");
                        setUsername("");
                        setPh("");
                    }
                } else {
                    setLoading(false);
                    toast.error("Tên tài khoản không tồn tại!!!");
                    setUsername("");
                    setPh("");
                    setIsTenTK("");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    //Xác nhận và gửi otp
    const onOTPVerify = () => {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(true);
                setLoading(false);
                toast.success("Gửi OTP thành công!");
                // nav("/inputOtp");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error("Xác nhận OTP thất bại!");
            });
    }

    const handlePhoneChange = (value) => {
        setPh(value);
        setIsPhValid(true); // Đặt lại trạng thái khi số điện thoại thay đổi
    };

    //Sau khi đặt lại mật khẩu
    const updatePassword = (evt) => {
        const form = evt.currentTarget;
        evt.preventDefault();

        if (form.checkValidity() === false) {
            evt.stopPropagation();
        }

        setValidated(true);

        const process = async () => {
            let formData = new FormData();

            formData.append("username", isTenTK.username);
            console.log(isTenTK.username);
            formData.append("password", taiKhoan.password);
            formData.append("newPassword", taiKhoan.newPassword);

            setLoading(true);

            let res = await authApi().post(endpoints['up-password'], formData);
            if (res.status === 200) {
                nav("/login");
            } else setErr("Hệ thống bị lỗi!");
        }

        //Kiểm tra mật khẩu vs mật khẩu xác nhập có khớp với nhau không
        if (taiKhoan.newPassword !== taiKhoan.confirmNewPassword) {
            setPassword(false);
        }
        else {
            process();
            setChangeSuccess(true);
            setLoading(false);
            console.log(taiKhoan.newPassword);
        }
    }
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col>
                        <div className="border border-5 border-primary"></div>
                        <div className='border border-1 border-primary text-center'>
                            <Toaster toastOptions={{ duration: 4000 }} />
                            <div id="recaptcha-container"></div>
                            {user ? (
                                <Card className="shadow">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase text-center text-blue-700">Đặt lại mật khẩu</h2>
                                            <div className="mb-3">
                                                <Form noValidate validated={validated}
                                                    onSubmit={updatePassword}
                                                >
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <p className="font-bold text-xl text-blue-700 text-left">Mật khẩu mới</p>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={taiKhoan.newPassword}
                                                            onChange={e => change(e, "newPassword")}
                                                            placeholder="Nhập mật khẩu mới ..." />
                                                        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập mật khẩu mới!!!
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <p className="font-bold text-xl text-blue-700 text-left">Xác nhận mật khẩu</p>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={taiKhoan.confirmNewPassword}
                                                            onChange={e => change(e, "confirmNewPassword")}
                                                            placeholder="Nhập lại mật khẩu mới ..." />
                                                        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng xác nhận lại mật khẩu!!!
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    {loading === false && <div className="d-grid">
                                                        <Button
                                                            variant="primary"
                                                            type="submit">
                                                            Đặt mật khẩu
                                                        </Button>
                                                    </div>}
                                                    {password === false ? <Alert>Mật khẩu không trùng khớp</Alert> : <div></div>}
                                                    {changeSuccess === true ? <Alert>Đổi mật khẩu thành công</Alert> : <div></div>}
                                                    {err !== null && <Alert>{err}</Alert>}
                                                </Form>

                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <div className="w-80 flex flex-col gap-4 rounded-lg p-4" style={{ width: '100%' }}>
                                    <h1 className="text-center leading-normal text-blue-700 text-5xl mb-6 font-bold">
                                        Quên mật khẩu
                                    </h1>
                                    {showOTP ? (
                                        <>
                                            <div className="bg-black text-blue-700 w-fit mx-auto p-4 rounded-full border border-3 border-primary">
                                                <BsFillShieldLockFill size={30} />
                                            </div>
                                            <h3
                                                htmlFor="ph"
                                                className="font-bold text-2xl text-blue-700 text-center"
                                                style={{ marginBottom: 0 }}
                                            >
                                                Nhập mã otp
                                            </h3>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                OTPLength={6}
                                                otpType="number"
                                                disabled={false}
                                                autoFocus
                                                className="opt-container"
                                            ></OtpInput>
                                            <button
                                                onClick={onOTPVerify}
                                                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                            >
                                                {loading && (
                                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                                )}
                                                <span>Xác minh OTP</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-white text-blue-700 w-fit mx-auto p-4 rounded-full border border-3 border-primary">
                                                <BsTelephoneFill size={30} />
                                            </div>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <p className="textDky">Tên đăng nhập</p>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={username}
                                                    onChange={e => {
                                                        setUsername(e.target.value);
                                                        setIsUserValid(true);
                                                    }}
                                                    placeholder="Nhập tên đăng nhập ..."
                                                />
                                                {!isUserValid && <p className='text-left font-medium' style={{ color: 'red' }}>Vui lòng điền tên đăng nhập.</p>}
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <p className="textDky">Số điện thoại</p>
                                                <PhoneInput country={"in"} value={ph} onChange={handlePhoneChange} />
                                            </Form.Group>
                                            {!isPhValid && <p className='text-left font-medium' style={{ color: 'red' }}>Vui lòng điền số điện thoại.</p>}
                                            <button
                                                onClick={onSubmitSMS}
                                                className="bg-white w-full flex gap-1 items-center justify-center py-2.5 text-white rounded "
                                            >
                                                {loading && (
                                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                                )}
                                                <span>Gửi SMS</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgetPassword;