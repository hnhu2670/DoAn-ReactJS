import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import cookie from "react-cookies"
import MySpinner from '../../layout/MySpinner'
import { Link } from 'react-router-dom'
import apis, { authApi, endpoints } from '../../configs/apis'
import { MyUserContext } from '../../App'
        
const ThongBaoDG = () => {
    const [user] = useContext(MyUserContext);
    const [cacphieucandanhgia, setCacPhieucandanhgia] = useState([]);

    useEffect(() => {
        const loadphieudanhgia = async () => {
        try {
            let res = await authApi().get(endpoints.cacphieucandanhgia);
            setCacPhieucandanhgia(res.data); // Lấy dữ liệu từ res.data
            console.log("Lấy được data");
            console.log("+++++++++++============");
        } catch (error) {
            console.log(error);
        }
        };
        loadphieudanhgia();
    }, []);
    return (
        <Container>
            <section>
                <h1 className="text-center text-login top-text">Thông báo các phiếu cần đánh giá</h1>
                    
                    {cacphieucandanhgia.map((t) => (<>
                    <Row className='mb-4'>
                    <div>Sau khi hoàn thành việc khám vào ngày {t.appointmentDate} cùng với bác sĩ {t.doctorId.name}. Mong bạn cho chúng tôi một ít lời nhận xét bằng cách  <Link to={`/danhgia/${t.id}`} >Nhấn </Link> và đánh giá nhé !!</div>
                        
                    </Row>
                    <hr />
                </>  ))}
            </section>


        </Container>
    )
}

export default ThongBaoDG