import React, { useEffect, useState } from 'react'
import { Alert, Container, Form } from 'react-bootstrap'
import cookie from "react-cookies"
import MySpinner from '../../layout/MySpinner'
import { Link } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'
import TypeButton from '../../button/Button'
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
    
    // if (noti === null) {
    //     return <Alert className='text-danger'>Chưa nhận được giá trị</Alert>;
    // }
    // else {
    //     console.log(noti)
    // }
    return (
        <Container>
            {/* <section>
                <h2>THÔNG BÁO YÊU CẦU THANH TOÁN</h2>
                {Object.values(noti).map((c) => (

                    <div key={c.id}>

                        Ma phieu kham {c.appoId} :
                        <Link to={`/thanhtoan/${c.appoId}`}>Thanh toan</Link>
                    </div>
                ))}
            </section> */}
            <section>
                <h2>THÔNG BÁO YÊU CẦU THANH TOÁN</h2>
                {phieucanthanhtoan.map((t)=>(
                    <div>Phiếu có mã là {t.id} đã khám cho bệnh nhân {t.sickpersonId.name} hoàn tất <TypeButton to={`/thanhtoan/${t.id}`}>nhấn</TypeButton> để thanh toán...</div>
                ))}
            </section>


        </Container>
    )
}

export default ThongBao