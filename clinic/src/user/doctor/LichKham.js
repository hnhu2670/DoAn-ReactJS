import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LichKham = () => {
    return (

        <Container>
            <section>
                <h1 className="text-center text-login top-text">LỊCH KHÁM BỆNH</h1>
                <Table striped bordered hove className="text-center mb-5">
                    <thead>
                        <tr>
                            <th>Tên bệnh nhân</th>
                            <th>Ngày khám</th>
                            <th>Giờ khám</th>
                            <th>Trạng thái</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Link to="">
                                    Khám
                                </Link>
                            </td>
                        </tr>
                        <tr >

                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </Table>
            </section>
        </Container>
    )
}

export default LichKham