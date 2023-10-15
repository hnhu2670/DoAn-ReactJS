import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'
import Search from 'antd/es/input/Search'

const LichSuKham = () => {
    const [lskham, setLSKham] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(null)

    const loadLSKham = async (id, date) => {
        try {
            let { data } = await apis.get(endpoints['lichsukham'](id), { params: { date } });
            setLSKham(data)
            setLoading(true)
            console.log(endpoints['lichsukham'](id), date);
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    };

    useEffect(() => {
        if (id) {
            loadLSKham(id, date)
        }
    }, [id])


    const handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm dựa trên ngày
        console.log(date);
        loadLSKham(id, date)
        console.log("thanh cong");
        // Gọi hàm tìm kiếm hoặc thực hiện các hành động khác
    };
    return (
        <div>
            <Container>
                <section>
                    <h1 className="text-center text-login top-text">LỊCH KHÁM BỆNH</h1>
                    <div >
                        <Row>
                            <Col sm={2}><h2>Tên bệnh nhân </h2></Col>
                            <Col><p style={{ fontSize: 25 + "px" }}>{lskham[0]?.sickpersonId.name}</p></Col>
                        </Row>


                        <Row>
                            <form onSubmit={handleSearch}>
                                <label>
                                    Ngày:
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </label>
                                <button type="submit">Tìm kiếm</button>
                            </form>
                        </Row>
                    </div >
                    {/* <Form style={{ display: "flex", width: 100 + "%", width: 96 + "%" }} className='mb-3 ml-3 p-0'
                        onSubmit={search}>
                        <div className='mr-3' style={{ width: 100 + "%" }}>

                            <Form.Control
                                type="date"
                                value={date}
                                onChange={e => setKw(e.target.value)}
                            />
                        </div>
                        <button className="btn-click" type="submit">🔍 Tìm kiếm</button>

                    </Form> */}
                    < Form className="form-thuoc" >
                        <Table striped bordered hove className="text-center mb-5 table-toathuoc">
                            <thead>
                                <tr>
                                    <th>Ngày khám</th>
                                    <th>Bác sĩ khám</th>
                                    <th>Triệu chứng</th>
                                    <th>Chuẩn đoán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lskham.map((h) => (
                                    <tr>
                                        <td>{new Date(h.appointmentDate).toLocaleDateString("vi-VN")}</td>
                                        <td>{h.doctorId.name}</td>
                                        <td>{h.prescriptionId.conclusion}</td>
                                        <td>{h.prescriptionId.symptom}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>


                </section >
            </Container >
        </div >
    )
}

export default LichSuKham