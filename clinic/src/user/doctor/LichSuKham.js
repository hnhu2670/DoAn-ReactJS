import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'

const LichSuKham = () => {
    const [lskham, setLSKham] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     const loadLSKham = async () => {
    //         try {
    //             let { data } = await apis.get(endpoints['lichsukham'](id));
    //             setLSKham(data)
    //             setLoading(true)
    //             console.log(data);

    //         } catch (err) {
    //             console.log(err);
    //             setLoading(false)
    //         }
    //     };
    //     loadLSKham()
    // }, [id])

    // const [date, setKw] = useState("");
    // const [q] = useSearchParams()
    // const [nav] = useNavigate([])
    // const search = (evt) => {
    //     evt.preventDefault();
    //     nav(`/xemlichkham/${id}/date=${date}`);
    // };
    // const timKiem = async () => {
    //     try {
    //         setLoading(true)
    //         let e = endpoints['lichsukham'](id);
    //         let ngayKham = q.get("date");
    //         if (ngayKham !== null) {
    //             e = `${e}?date=${ngayKham}`;
    //         }

    //         let res = await apis.get(e);
    //         setLSKham(res.data);

    //         console.log(res.data);
    //     } catch (err) {
    //         setLoading(false);
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     timKiem()
    // }, [q])
    // useEffect(() => {
    //     const loadLSKham = async () => {
    //         try {
    //             let { data } = await apis.get(endpoints['lichsukham'](id));
    //             setLSKham(data);
    //             setLoading(true);
    //             console.log(data);
    //         } catch (err) {
    //             console.log(err);
    //             setLoading(false);
    //         }
    //     };
    //     loadLSKham();
    // }, [id]);

    const [date, setKw] = useState("");
    const [q] = useSearchParams();
    const [nav] = useNavigate([]);
    const search = (evt) => {
        evt.preventDefault();
        nav(`/xemlichkham/${id}?date=${date}`);
    };
    const timKiem = async () => {
        try {
            setLoading(true);
            let e = endpoints['lichsukham'](id);
            let ngayKham = q.get("date");
            if (ngayKham !== null) {
                e = `${e}?date=${ngayKham}`;
            }

            let res = await apis.get(e);
            setLSKham(res.data);

            console.log(res.data);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    useEffect(() => {
        timKiem();
    }, [q]);
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
                    </div>
                    <Form style={{ display: "flex", width: 100 + "%", width: 96 + "%" }} className='mb-3 ml-3 p-0'
                        onSubmit={search}>
                        <div className='mr-3' style={{ width: 100 + "%" }}>

                            <Form.Control
                                type="date"
                                value={date}
                                onChange={e => setKw(e.target.value)}
                            />
                        </div>
                        <button className="btn-click" type="submit">🔍 Tìm kiếm</button>

                    </Form>
                    <Form className="form-thuoc" >
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
                    </Form>

                </section>
            </Container>
        </div >
    )
}

export default LichSuKham