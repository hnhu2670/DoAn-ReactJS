import { Col, Container, Form, Row, Table } from "react-bootstrap"
import TypeButton from "../../button/Button"

const ThanhToan = () => {

    return (<>
        <Container>
            <section>
                <h1 className="text-center text-login top-text">THANH TOÁN HÓA ĐƠN</h1>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin bệnh nhân</h2>
                    <Row>
                        <Col>
                            Họ tên
                        </Col>
                        <Col>
                            Ngày sinh
                        </Col>
                        <Col>
                            giới tính
                        </Col>
                    </Row>
                    <Row>Địa chỉ</Row>
                    <Row>Điện thoại</Row>
                </div>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin thuốc</h2>
                    <Table striped bordered hove className="text-center mb-5">
                        <thead>
                            <tr>
                                <th>Mã thuốc</th>
                                <th>Tên thuốc</th>
                                <th>Số lượng</th>
                                <th>Đơn vị</th>
                                <th>Giá</th>
                                <th>Tổng </th>

                            </tr>
                        </thead>
                        <tbody>
                            <td>Hướng dẫn sử dụng</td>

                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin dịch vụ</h2>
                    <Table striped bordered hove className="text-center mb-5">
                        <thead>
                            <tr>
                                <th>Mã dịch vụ</th>
                                <th>Tên dịch vụ</th>
                                <th>Giá</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Tổng tiền: </h2>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Hình thức thanh toán</Form.Label>
                            <Form.Control as="select"
                                required>
                            </Form.Control>

                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tiền khách đưa</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tiền khách đưa"
                                    required
                                />

                            </Form.Group>
                        </Col>
                        <Col>

                            <Form.Group className="mb-3">
                                <Form.Label>Tiền trả lại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tiền trả lại"
                                    required
                                />

                            </Form.Group>
                        </Col>
                        <Col className="mt-4">
                            <Form.Group className="mb-3">
                                <TypeButton type="submit">THANH TOÁN</TypeButton>
                            </Form.Group>
                        </Col>

                    </Row>
                </div>
            </section>
        </Container>
    </>)
}
export default ThanhToan