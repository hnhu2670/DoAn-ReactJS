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
    console.log(user)
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

                                    {user === null ? <>
                                        <li><Link variant="secondary" to="/login">Đăng nhập</Link></li>
                                        <li><Link variant="secondary" to="/dangky">Đăng ký</Link></li>
                                    </> : <>
                                        {/* nurse */}
                                        <li><Link variant="secondary" to="/thongbao"> Thông báo {notiCount}</Link></li>

                                        <li><Link variant="secondary" className='booking' to="/dangkylam"> Đăng Ký Làm Việc </Link></li>
                                        <li><Link variant="secondary" to="/xemlich"> Lịch Đăng Ký </Link></li>
                                        <li><Link variant="secondary" className='booking' to="/datlichkham"> Đăng Ký Khám </Link></li>

                                        <div style={{ paddingTop: 15 + "px" }}>
                                            <img class="avt_user" src={user.avatar} alt="" />
                                        </div>

                                        <li><Link variant="secondary" to="/trangcanhan">  Chào {user.username}! </Link></li>
                                        if(user.roleId.id===2)
                                        {
                                            <li><Link variant="secondary" to="/xemlichkham">  Xem lịch khám </Link></li>

                                        }

                                        <li><Link variant="secondary" to="/allchat">Chat now</Link></li>
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