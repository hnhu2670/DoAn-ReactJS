import { useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/apis";
import MySpinner from "../layout/MySpinner";
import "../resources/css/style.css";
import "../resources/css/register.css"
const Register = () => {
    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "name": "",
        "email": "",
        "phone": "",
        "address": "",
        "dod": "",
        "sex": "",
        "confirmPass": "",
        "role": "ROLE_SICKPERSON"
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const avatar = useRef();
    let nav = useNavigate();

    const change = (evt, field) => {
        setUser(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    const register = (evt) => {
        evt.preventDefault();



        const process = async () => {
            let formData = new FormData();

            for (let field in user)
                if (field !== "confirmPass")
                    formData.append(field, user[field]);

            formData.append("avatar", avatar.current.files[0]);
            console.log(formData);
            setLoading(true)
            try {
                let res = await Apis.post(endpoints['register'], formData);
                console.log("thanh cong");
                if (res.status === 201) {
                    nav("/login");
                }
                else {
                    setErr("Hệ thống lỗi !!! Vui lòng đăng ký lại sau !!!!!")
                }
            } catch (error) {
                setErr("Hệ thống lỗi !!! Vui lòng đăng ký lại sau !!!!!")
                console.log(error)
            }

        }

        if (user.password !== user.confirmPass) {
            setErr("Mật khẩu KHÔNG khớp!");
        } else {
            process();
        }
        console.log(user);
    }


    return <>

        <section id="section-register">
            <div className="form-register">
                {/* <div className="img_signin">
                <img src="https://www.livemint.com/lm-img/img/2023/07/30/1600x900/It-is-a-noble-profession-but-becoming-a-doctor-is-_1690736586642.jpg" alt="alert" />
            </div> */}

                <h1 className="text-center text-login top-text">ĐĂNG KÝ TÀI KHOẢN</h1>

                <Form onSubmit={register} className='contentsignin'>
                    <Row className="m-2">
                        <Form.Group className="mb-3" >
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" placeholder="Tên"
                                onChange={e => change(e, "name")}
                                value={user.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3" >
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control type="text" value={user.username}
                                onChange={e => change(e, "username")} placeholder="Tên đăng nhập"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên đăng nhập!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Control as="select" value={user.sex} onChange={e => change(e, "sex")} >

                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Vui lòng chọn giới tính!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control type="date" value={user.dod}
                                onChange={e => change(e, "dod")} placeholder="Xác nhận mật khẩu"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" value={user.address}
                                onChange={e => change(e, "address")} placeholder="Địa chỉ"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập địa chỉ!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="m-2">
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email"
                                    value={user.email}
                                    onChange={e => change(e, "email")}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập email!!!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Điện thoại</Form.Label>
                                <Form.Control type="tel" placeholder="Điện thoại"
                                    value={user.phone} onChange={e => change(e, "phone")}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập số điện thoại!!!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" value={user.password}
                                onChange={e => change(e, "password")} placeholder="Mật khẩu"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập password!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control type="password" value={user.confirmPass}
                                onChange={e => change(e, "confirmPass")} placeholder="Xác nhận mật khẩu"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập lại pasword!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="file" ref={avatar} />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng chọn ảnh!!!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group >
                            {loading === true ? <MySpinner /> : <Button type="submit" variant="danger">Đăng ký</Button>}

                        </Form.Group>
                    </Row>
                    {err === null ? "" : <Alert variant="danger">{err}</Alert>}

                </Form>
            </div>
        </section>



    </>
}

export default Register;