import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Row, Table } from 'react-bootstrap'
import cookie from "react-cookies"
import MySpinner from '../../layout/MySpinner'
import { Link } from 'react-router-dom'
import apis, { authApi, endpoints } from '../../configs/apis'
import { MyUserContext } from '../../App'
import moment from 'moment/moment'

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
                <h1 className="text-center text-login top-text">ĐÁNH GIÁ BÁC SĨ</h1>
                {cacphieucandanhgia.length > 0 ? (
                    cacphieucandanhgia.map((t) => (
                        <>
                            <Row className='mb-4 mt-4'>
                                <div>Sau khi hoàn thành việc khám vào ngày <span style={{ color: "red" }}>{moment(t.appointmentDate).format('DD/MM/YYYY')}</span>
                                    cùng với bác sĩ {t.doctorId.name}.
                                    Mong bạn cho chúng tôi một ít lời góp ý !!!
                                    <Link to={`/danhgia/${t.id}`} ><span className='booking' > ĐÁNH GIÁ NGAY</span> </Link>
                                </div>
                            </Row>
                            <hr />
                        </>
                    ))
                ) : (
                    <Alert className='w-90 mr-10 ml-10 text-danger' style={{ border: "1px solid red" }}>Không có đánh giá</Alert>
                )}


                {/* {cacphieucandanhgia.map((t) => (<>
                    <Row className='mb-4'>
                        <div>Sau khi hoàn thành việc khám vào ngày {moment(t.appointmentDate).format('DD/MM/YYYY')} cùng với bác sĩ {t.doctorId.name}. Mong bạn cho chúng tôi một ít lời nhận xét bằng cách  <Link to={`/danhgia/${t.id}`} >Nhấn </Link> và đánh giá nhé !!</div>

                    </Row>
                    <hr />
                </>))} */}
            </section>


        </Container>
    )
}

export default ThongBaoDG