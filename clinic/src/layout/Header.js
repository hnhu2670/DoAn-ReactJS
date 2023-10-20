import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../resources/image/logo.png'
import 'tippy.js/dist/tippy.css';
import "../resources/css/style.css";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { MyNotiContext, MyUserContext } from "../App";
import { Alert } from 'react-bootstrap';
import apis, { authApi, endpoints } from '../configs/apis';
import { doc } from 'firebase/firestore';
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


    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <>
            <div>
                <header >
                    {/* <ul id="menu">
                        <li className={activeIndex === 0 ? "menu-active" : ""}>
                            <a href="#" onClick={() => handleClick(0)}>Link 1</a>
                        </li>
                        <li className={activeIndex === 1 ? "menu-active" : ""}>
                            <a href="#" onClick={() => handleClick(1)}>Link 2</a>
                        </li>
                        <li className={activeIndex === 2 ? "menu- active" : ""}>
                            <a href="#" onClick={() => handleClick(2)}>Link 3</a>
                        </li>
                    </ul> */}
                    <section className="section-header">
                        <div className="flex tab-menu text-lg">
                            <div className="logoName">
                                <Link to="/" ><img src={logoImg} alt="logo" /></Link>
                                <Link to="/" ><h1>PISCES hospital</h1></Link>

                            </div>

                            <nav className="menu" id='menu'>
                                <ul className="flex">

                                    <li className={activeIndex === 0 ? "menu-active" : ""}>
                                        <Link variant="secondary" to="/bacsi"
                                            onClick={() => handleClick(0)}
                                        > Bác sĩ </Link></li>
                                    {user === null ? <>

                                        <li className={activeIndex === 1 ? "menu-active" : ""}>
                                            <Link variant="secondary" to="/login"
                                                onClick={() => handleClick(1)}
                                            >Đăng nhập</Link></li>
                                        <li className={activeIndex === 2 ? "menu-active" : ""}>
                                            <Link variant="secondary" to="/dangky"
                                                onClick={() => handleClick(2)}
                                            >Đăng ký</Link></li>
                                    </> : <>

                                        {user.roleId.id === 3 ?
                                            <>
                                                <li className={activeIndex === 3 ? "menu-active" : ""}>
                                                    <Link variant="secondary" className='booking ' to="/dangkylam" onClick={() => handleClick(3)}>
                                                        Đăng Ký Làm Việc </Link></li>
                                                <li className={activeIndex === 4 ? "menu-active" : ""}><Link variant="secondary" to="/xacnhanlich" onClick={() => handleClick(4)}> Xác nhận lịch khám</Link></li>
                                                <li className={activeIndex === 5 ? "menu-active" : ""}><Link variant="secondary" to="/thongbao" onClick={() => handleClick(5)}> 🔔 {phieucanthanhtoan.length}</Link></li>

                                            </> :
                                            <>
                                                {user.roleId.id === 2 ?
                                                    <>
                                                        <li className={activeIndex === 6 ? "menu-active" : ""}><Link variant="secondary" className='booking' to="/dangkylam" onClick={() => handleClick(6)}> Đăng Ký Làm Việc </Link></li>
                                                        <li className={activeIndex === 7 ? "menu-active" : ""}><Link variant="secondary" to="/xemlichkham" onClick={() => handleClick(7)}> Xem lịch khám </Link></li>
                                                    </> :
                                                    <>
                                                        <li className={activeIndex === 8 ? "menu-active" : ""}><Link variant="secondary" className='booking' to="/datlichkham" onClick={() => handleClick(8)}> Đăng Ký Khám </Link></li>
                                                        <li className={activeIndex === 9 ? "menu-active" : ""}><Link variant="secondary" to="/xemlich" onClick={() => handleClick(9)}>Xem lịch khám</Link></li>
                                                        {/* <li><Link variant="secondary" to="/danhgia">Đánh giá</Link></li> */}

                                                        <li className={activeIndex === 10 ? "menu-active" : ""}><Link variant="secondary" to="/thongbaodanhgia" onClick={() => handleClick(10)}> 🔔{phieucandanhgia.length} </Link></li>

                                                    </>}
                                            </>}
                                        <li className={activeIndex === 11 ? "menu-active" : ""}><Link variant="secondary" to="/chatapp" onClick={() => handleClick(11)}>Chat now</Link></li>
                                        <div style={{ paddingTop: 15 + "px" }}>
                                            <img class="avt_user" src={user.avatar} alt="" />
                                        </div>
                                        <li className={activeIndex === 12 ? "menu-active" : ""}><Link variant="secondary" to="/trangcanhan" onClick={() => handleClick(12)}>  Chào {user.username}! </Link></li>
                                        <li ><Link variant="secondary" onClick={logout} to="/"

                                        >Đăng xuất</Link></li>
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