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
        "avatar": current_user.avatar

    })
    // const [avatar, setAvatar] = useState({

    // })

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
    const updateUser = (evt) => {
        console.log(user.avatar)
        evt.preventDefault();
        setLoading(true);
        const process = async () => {
            try {
                let form = new FormData();
                form.append("dod", user.dod);
                if(avatar.current.files.length > 0){
                    form.append("avatar", avatar.current.files[0]);
                    console.log("anh moi")
                } else {
                    form.append("avatar", user.avatar);
                    console.log("anh cu");
                  }
                console.log(user.dod)
                for (let field in user) {
                    form.append(field, user[field]);
                }
               
                console.log(form)
                window.confirm("test")
                let res = await authApi().post(endpoints['update-user'], form);
                // let res1 = await authApi().post(endpoints['update-avatar'], form);
                // console.log(res.data)

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
        process();

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
                                    <Image src={user.avatar} rounded />
                                    <Form.Control className="mt-2" type='file' ref={avatar} style={{ width: 70 + "%" }} />
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

                                <Row>
                                    <TypeButton className="btn-normal" type="submit">UPDATE</TypeButton>
                                </Row>
                            </Col>
                        </Row>


                    </Form>
                </div>
            </section>

        </Container >

    </>)
}
// function Update() {
//     const nav = useNavigate();
//     // const [data, setData] = useState([])
//     const [value, setValue] = useState({
//         name: "",
//         address: "",
//         phone: "",
//         emaill: ""
//     })

//     useEffect(() => {
//         const loadUser = async () => {
//             try {
//                 let { data } = await authApi().get(endpoints['current-user']);
//                 setValue(data);

//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         loadUser()
//     }, [])
//     const updateUser = (evt) => {
//         evt.preventDefault();
//         const loadUpdate = async () => {
//             try {
//                 let res = await authApi().post(endpoints['update-user'], value);
//                 // setData(data);
//                 if (res.status === 200) {
//                     nav("/");
//                     console.log("thành công")
//                     // nav("/");
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         loadUpdate()
//     }
//     return (<>
//         <Container>
//             <section id="section-profile">

//                 <div className="avatar">
//                     {/* <Image src={user_avatar} rounded /> */}
//                     <Form.Control className="avatar_input"
//                         accept=".jpg, .jpeg, .png, .gif, .bmp" type="file"
//                     />
//                 </div>
//                 <div className="profile-text">
//                     <Form id="form-profile" onChange={updateUser}>
//                         <h1 className="text-center">MY PROFILE</h1>

//                         <Row>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control type="text" defaultValue={value.name}
//                                     onChange={(e) => setValue({ ...value, name: e.target.value })}
//                                 />
//                             </Form.Group>
//                         </Row>
//                         <Row>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control type="text" defaultValue={value.address}
//                                     onChange={(e) => setValue({ ...value, address: e.target.value })}
//                                 />
//                             </Form.Group>

//                         </Row>
//                         <Row>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control type="text" defaultValue={value.emaill}
//                                     onChange={(e) => setValue({ ...value, emaill: e.target.value })}
//                                 />
//                             </Form.Group>
//                         </Row>
//                         <Row>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Phone</Form.Label>
//                                 <Form.Control type="text" defaultValue={value.phone}
//                                     onChange={(e) => setValue({ ...value, phone: e.target.value })}

//                                 />
//                             </Form.Group>
//                         </Row>

//                         <Row>
//                             <TypeButton className="btn-normal">UPDATE</TypeButton>
//                         </Row>
//                     </Form>
//                 </div>
//             </section>

//         </Container >

//     </>)
// }
export default MyProfile