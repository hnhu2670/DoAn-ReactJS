import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import "../nurse/XNLichKham.css"
const XNKham = () => {
    return (<>


        <Container>

            <section id="section-xacnhan ">
                <h1 className="text-center text-login top-text">XÁC NHẬN LỊCH KHÁM</h1>
                <Table striped bordered hove className="text-center mb-5">
                    <thead>
                        <tr>
                            <th>Mã phiếu khám</th>
                            <th>Mã bệnh nhân</th>
                            <th>Ngày đăng ký</th>
                            <th>Tên y tá</th>
                            <th>Bác sĩ khám</th>
                            <th>Trạng thái</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>

                        </tr>
                        <tr >

                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </Table>
            </section>
            <hr></hr>
            <section id="section-chonbs">
                <h1 className="text-center top-text mb-4">CHỌN BÁC SĨ</h1>
                <Form>
                    <Row className="m-2">
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Mã phiếu khám</Form.Label>
                                <Form.Control type="text" placeholder="STT"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Mã bệnh nhân</Form.Label>
                                <Form.Control type="text" placeholder="Mã bệnh nhân"
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3" >
                            <Form.Label>Ngày khám</Form.Label>
                            <Form.Control type="date" placeholder="Ngày khám"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3" >
                            <Form.Label>Tên y tá</Form.Label>
                            <Form.Control type="text" placeholder="Tên y tá"
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="m-2">
                        <Form.Group className="mb-3" >
                            <Form.Label>Tên bác sĩ</Form.Label>
                            <Form.Select aria-label="Default select example" style={{ height: 46 + "px" }}>
                                <option>Tên bác sĩ</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mt-2 w-full">
                        <Form.Group className="mb-3">
                            <button type="submit" className="btn-xacnhan p-2">
                                XÁC NHẬN
                            </button>

                        </Form.Group>
                    </Row>
                </Form>
            </section>

        </Container>
    </>)
}
export default XNKham