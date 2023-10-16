import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap"
import { MyUserContext } from "../App";
import "../resources/css/myProfile.css"
import TypeButton from "../button/Button";
import apis, { authApi, endpoints } from "../configs/apis";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import format from "date-fns/format";
import { useRef } from "react";
const MyProfile = () => {

    const [current_user, dispatch] = useContext(MyUserContext);
    const currentDate = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const avatar = useRef();
    const date = format(new Date(current_user.dod), "yyyy-MM-dd");
    const [user, setUser] = useState({

        "name": current_user.name,
        "address": current_user.address,
        "email": current_user.emaill,
        "phone": current_user.phone,
        "dod": date,
        // "avatar": current_user.avatar

    })
 
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };

    const change = (evt, field) => {
        setUser(current => {
            return { ...current, [field]: evt.target.value.trim() }
        })
    }
    // console.log(current_user)
    const reloadUser = async () => {
        try {
            let { data } = await authApi().get(endpoints['current-user']);
            cookie.save("user", data);

            dispatch({
                "type": "login",
                "payload": data
            });
        } catch (err) {
            console.log(err);
        }
    }
    const validateFields = () => {
        const nameRegex = /^[\p{L}\s]+$/u;
        if (!nameRegex.test(user.name)) {
          alert("Vui lòng chỉ nhập chữ cái và dấu cách cho trường tên...");
          return false;
        }
        
        const addressRegex = /^[A-Za-z0-9\s]+$/;
        if (!addressRegex.test(user.address)) {
          alert("Vui lòng chỉ nhập chữ cái, số và dấu cách cho trường địa chỉ...");
          return false;
        }
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(user.phone)) {
          alert("Vui lòng nhập lại số điện thoại của bạn...");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
          alert("Vui lòng nhập lại địa chỉ email của bạn...");
          return false;
        }

        const currentDate = new Date();
        const dob = new Date(user.dod);
        const age = currentDate.getFullYear() - dob.getFullYear();
        const monthDiff = currentDate.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
          age--;
        }
      
        if (age < 16) {
            alert("Người dùng đang "+age+ " tuổi (người dùng phải từ 16 tuổi trở lên)!!!");
            return false;
        }
        return true;
      };
    
    const updateUser = (evt) => {
        console.log(avatar.current.files)
        evt.preventDefault();
        setLoading(true);
        const process = async () => {
            try {
                let form = new FormData();
                // let avatar = new FormData();
                form.append("dod", user.dod);
                if(avatar.current.files.length > 0){
                    console.log("do thay anh")
                    form.append("avatar", avatar.current.files[0]);
                    let thayanh = await authApi().post(endpoints['update-avatar'], form);
                    console.log("thay ảnh xog ời")
                }
                console.log(user.dod)
                for (let field in user) {
                    form.append(field, user[field]);
                    console.log(user[field])
                }
                let res = await authApi().post(endpoints['update-user'], form);
                console.log(res.data)

                if (res.status === 200) {
                    setLoading(true);
                    reloadUser();
                    nav("/");
                    console.log("luu thanh cong")
                }

            } catch (err) {
                console.log(err);
                setLoading(false);
            }

        }
        if (validateFields()) {
            process();
          }
        
    }
    
    return (<>
        <Container>
            <section id="section-profile">


                <div className="profile-text">
                    <Form id="form-profile" onSubmit={updateUser}>
                        <h1 className="text-center text-login top-text">MY PROFILE</h1>
                        <Row className="mt-5">
                            <Col sm={5} className="mt-5">
                                <Form.Group
                                    className="mb-3 profile-avatar"
                                    controlId="formBasicAvatar">
                                    {/* <Image src={current_user.avatar} rounded /> */}
                                    <Image src={selectedImage ? URL.createObjectURL(selectedImage) : current_user.avatar} rounded />
                                    {/* <Form.Control className="mt-2" type='file' ref={avatar} style={{ width: 70 + "%" }} /> */}
                                    <Form.Control className="mt-2" type='file' accept=".png" ref={avatar} style={{ width: 70 + "%" }} onChange={handleImageChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={user.name}
                                            onChange={(e) => change(e, "name")}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" value={user.address}
                                            onChange={(e) => change(e, "address")}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ngày sinh</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Ngày sinh"
                                            value={user.dod}
                                            onChange={(e) => change(e, "dod")}
                                            max={currentDate}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={user.email}
                                            onChange={(e) => change(e, "email")}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="tel" value={user.phone}
                                            onChange={(e) => change(e, "phone")}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row style={{ width: 95 + "%" }}>
                                    <TypeButton className="typebutton" type="submit">UPDATE</TypeButton>
                                </Row>
                            </Col>
                        </Row>


                    </Form>
                </div>
            </section>

        </Container >

    </>)
}
export default MyProfile