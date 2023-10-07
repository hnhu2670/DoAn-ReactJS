import { Col, Container, Form, Row, Table } from "react-bootstrap"
import TypeButton from "../../button/Button"
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import apis, { endpoints } from "../../configs/apis";
import MySpinner from "../../layout/MySpinner";

const ThanhToan = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [phieu, setPhieuKham] = useState([])
    useEffect(() => {
        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
                setPhieuKham(data)
                setLoading(true)
                console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };
        loadPhieuKham()
    }, [id]);
    if (phieu === null) {
        return (<>
            <MySpinner />
        </>)
    }
    return (<>
        <Container>
            <section>
                <h1 className="text-center text-login top-text">THANH TOÁN HÓA ĐƠN</h1>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin bệnh nhân</h2>
                    {loading === true ? (
                        <>
                            <Row>
                                <Col>
                                    Họ tên : {phieu.sickpersonId.name}
                                </Col>
                                <Col>
                                    Ngày sinh :{phieu.sickpersonId.dod}
                                </Col>
                                <Col>
                                    giới tính : {phieu.sickpersonId.sex}
                                </Col>
                            </Row>
                            <Row>Địa chỉ : {phieu.sickpersonId.address}</Row>
                            <Row>Điện thoại : {phieu.sickpersonId.phone}</Row>
                        </>
                    ) : (<>
                        <MySpinner />
                    </>)}

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