import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../resources/image/logo.png'
import 'tippy.js/dist/tippy.css';
import "../resources/css/style.css";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { MyNotiContext, MyUserContext } from "../App";
import { Alert } from 'react-bootstrap';
import apis, { authApi, endpoints } from '../configs/apis';
const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);

    console.log(user)
    // số lượng thông báo sẽ hiện ra
    const [notiCount,] = useContext(MyNotiContext);

    const nav = useNavigate;

    const logout = () => {
        dispatch({
            "type": "logout"
        })

    }
    console.log(user)

    const [phieucanthanhtoan, setPhieucanthanhtoan] = useState([])
    const loadphieu = async () => {
        try {
            let res = await apis.get(endpoints["lichkhamcanthanhtoan"])
            setPhieucanthanhtoan(res.data)
            console.log("lấy được data")
            console.log("================================")
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const loadphieudanhgia = async () => {
        try {
            let res = await authApi().get(endpoints["cacphieucandanhgia"])
            setPhieucandanhgia(res.data)
            console.log("lấy được data")
            console.log("================================")
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const [phieucandanhgia, setPhieucandanhgia] = useState([])
    useEffect(() => {
        loadphieudanhgia()
        loadphieu()
    }, []);
    return (
        <>
            <div>
                <header>
                    <section className="section-header">
                        <div className="flex tab-menu text-lg">
                            <div className="logoName">
                                <Link to="/" ><img src={logoImg} alt="logo" /></Link>
                                <Link to="/" ><h1>PISCES hospital</h1></Link>

                            </div>

                            <nav className="menu ">
                                <ul className="flex">

                                    <li><Link variant="secondary" to="/bacsi"> Bác sĩ </Link></li>
                                    {user === null ? <>

                                        <li><Link variant="secondary" to="/login">Đăng nhập</Link></li>
                                        <li><Link variant="secondary" to="/dangky">Đăng ký</Link></li>
                                    </> : <>

                                        {user.roleId.id === 3 ?
                                            <>
                                                <li><Link variant="secondary" className='booking' to="/dangkylam"> Đăng Ký Làm Việc </Link></li>
                                                <li><Link variant="secondary" to="/xacnhanlich"> Xác nhận lịch khám</Link></li>
                                                <li><Link variant="secondary" to="/thongbao"> 🔔 {phieucanthanhtoan.length}</Link></li>

                                            </> :
                                            <>
                                                {user.roleId.id === 2 ?
                                                    <>
                                                        <li><Link variant="secondary" className='booking' to="/dangkylam"> Đăng Ký Làm Việc </Link></li>
                                                        <li><Link variant="secondary" to="/xemlichkham"> Xem lịch khám </Link></li>
                                                    </> :
                                                    <>
                                                        <li><Link variant="secondary" className='booking' to="/datlichkham"> Đăng Ký Khám </Link></li>
                                                        <li><Link variant="secondary" to="/xemlich">Xem lịch khám</Link></li>
                                                        {/* <li><Link variant="secondary" to="/danhgia">Đánh giá</Link></li> */}

                                                        <li><Link variant="secondary" to="/thongbaodanhgia"> 🔔{phieucandanhgia.length} </Link></li>

                                                    </>}
                                            </>}
                                        <li><Link variant="secondary" to="/allchat">Chat now</Link></li>
                                        <div style={{ paddingTop: 15 + "px" }}>
                                            <img class="avt_user" src={user.avatar} alt="" />
                                        </div>
                                        <li><Link variant="secondary" to="/trangcanhan">  Chào {user.username}! </Link></li>
                                        <li><Link variant="secondary" onClick={logout} to="/">Đăng xuất</Link></li>
                                    </>}
                                </ul>
                            </nav>
                        </div>
                    </section>
                </header>
            </div>
        </>
    );
};

export default Header;