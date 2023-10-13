import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import cookie from "react-cookies"
import MySpinner from '../../layout/MySpinner'
import { Link } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'
import "./XNLichKham.css"
const ThongBao = () => {
    // const noti = cookie.load("bill") || null;
    const [phieucanthanhtoan, setPhieucanthanhtoan] = useState([])
    useEffect(() => {
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
        loadphieu()
    }, []);

    return (
        <Container>

            <section>
                <h1 className="text-center text-login top-text">YÊU CẦU THANH TOÁN HÓA ĐƠN</h1>

                {phieucanthanhtoan.map((t) => (<>
                    <Row className='mb-4'>
                        Phiếu có mã là {t.id} đã khám cho bệnh nhân {t.sickpersonId.name} hoàn tất
                        <Link to={`/thanhtoan/${t.id}`} className='thanhtoan'>Nhấn </Link> để thanh toán...
                    </Row>
                    <hr />
                </>


                ))}
            </section>


        </Container>
    )
}

export default ThongBao