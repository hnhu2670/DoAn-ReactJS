import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'

const LichSuKham = () => {
    const [lskham, setLSKham] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadLSKham = async () => {
            try {
                let { data } = await apis.get(endpoints['lichsukham'](id));
                setLSKham(data)
                setLoading(true)
                console.log(data);

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        };
        loadLSKham()
    }, [])
    return (
        <div>
            <Container>
                <section>
                    <h1 className="text-center text-login top-text">LỊCH KHÁM BỆNH</h1>
                    <div >
                        <Row>
                            <Col><h2>Tên bệnh nhân</h2></Col>
                            <Col><p></p></Col>
                        </Row>


                    </div>
                    <Table striped bordered hove className="text-center mb-5">
                        <thead>
                            <tr>
                                <th>Ngày khám</th>
                                <th>Bác sĩ khám</th>
                                <th>Triệu chứng</th>
                                <th>Chuẩn đoán</th>
                            </tr>
                        </thead>
                        <tbody>


                        </tbody>
                    </Table>
                </section>
            </Container>
        </div>
    )
}

export default LichSuKham