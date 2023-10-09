import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../resources/image/logo.png'
import 'tippy.js/dist/tippy.css';
import "../resources/css/style.css";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { MyNotiContext, MyUserContext } from "../App";
import { Dropdown } from 'react-bootstrap';
const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    // số lượng thông báo sẽ hiện ra
    const [notiCount,] = useContext(MyNotiContext);

    const nav = useNavigate;

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }
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
                                    <li><Link variant="secondary" to="/thongbao"> Thông báo {notiCount}</Link></li>
                                    {user === null ? <>
                                        <li>
                                            <Link variant="secondary" to="/login">Đăng nhập</Link></li>
                                        <li><Link variant="secondary" to="/dangky">Đăng ký</Link></li>
                                    </> : <>

                                        <li><Link variant="secondary" className='booking' to="/datlichkham"> Đăng Ký Khám </Link></li>
                                        <li><Link variant="secondary" className='booking' to="/dangkylam"> Đăng Ký Làm Việc </Link></li>
                                        <li><Link variant="secondary" to="/xemlich"> Lịch Đăng Ký </Link></li>
                                        <div style={{ paddingTop: 15 + "px" }}>
                                            <img class="avt_user" src={user.avatar} alt="" />
                                        </div>

                                        <li id='login-name'>
                                            <Dropdown >
                                                <Dropdown.Toggle className='btn-loginuser'>
                                                    Chào {user.username}!
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item ><Link className='text-center' to="/trangcanhan"> Hồ sơ của tôi </Link></Dropdown.Item>
                                                    <Dropdown.Item ><Link variant="secondary" to=""> Lịch khám bệnh </Link></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </li>
                                        {/* <li><Link className='text-center' to="/login-google">Chat now</Link></li> */}
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