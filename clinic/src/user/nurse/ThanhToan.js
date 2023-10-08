// import {  Col, Container, Form, Row, Table } from "react-bootstrap"
import { Button, Col, Container, Form, Row, Table, Alert } from "react-bootstrap"
import TypeButton from "../../button/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import apis, { endpoints } from "../../configs/apis";
import MySpinner from "../../layout/MySpinner";
import axios from "axios";

const ThanhToan = () => {
    const nav = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [phieu, setPhieuKham] = useState([])

    const [phieuBenh, setPhieuBenh] = useState([])
    const [thuocs, setThuocs] = useState([])
    const [dichvus, setDichvus] = useState([])
    const [loaipay, setloaipay] = useState([])
    const [hoadon, sethoadon] = useState([])
    const [thanhtoan, setthanhtoan] = useState({
        idAppo: id,
        loaithanhtoan: "null"
    })
    useEffect(() => {
        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](22));
                setPhieuKham(data)
                setLoading(true)

                console.log(data);
                console.log("-----------------------------")


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };
        const loadPhieuBenh = async () => {
            try {
                let { data } = await apis.get(endpoints['phieubenh'](id));
                setPhieuBenh(data)
                // setLoading(true)

                // console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };

        const loadthuoc = async () => {
            try {
                let { data } = await apis.get(endpoints['thuockham'](id));
                setThuocs(data)
                setLoading(true)
                // console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };


        const loaddichvu = async () => {
            try {
                let { data } = await apis.get(endpoints['dichvukham'](id));
                setDichvus(data)
                setLoading(true)
                // console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };

        const loadbill = async () => {
            try {
                let { data } = await apis.get(endpoints['hoadon'](id));
                sethoadon(data)
                setLoading(true)
                // console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };

        loadPhieuKham()

        loadPhieuBenh()
        loadthuoc()
        loaddichvu()
        loadbill()
    }, [id]);

    useEffect(() => {
        const loadpay = async () => {
            try {
                let { data } = await apis.get(endpoints['loaipayment']);
                setloaipay(data)
                setLoading(true)
                // console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        };
        loadpay()

    }, []);

    const thanhtoanhoadon = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("idAppo", thanhtoan.idAppo);
                formData.append("loaithanhtoan", thanhtoan.loaithanhtoan);
                // console.log(formData.data);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["thanhtoan"], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                    console.log(res)
                    // window.location.href = res.headers.location;
                    axios.get(res);
                }
                if (res.status === 302) {
                    console.log(res)
                    // window.location.href = res.headers.location;;
                    // axios.get(res)
                }
            } catch (error) {
                console.log(error)
            }




        }


        process();
    }

    const chonhinhthucthanhtoan = (event) => {
        const value = event.target.value; // Get the current value of the input field

        setthanhtoan((current) => {
            const update = { ...current };
            update["loaithanhtoan"] = value;
            return update;
        });
    }
    if (phieu === null) {
        return (<>
            <MySpinner />
        </>)
    }


    console.log(thanhtoan);
    return (<>
        <Container>
            <section>
                <h1 className="text-center text-login top-text">THANH TOÁN HÓA ĐƠN</h1>
                {/* <div>
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
                            <Row>Chuẩn đoán : {phieu.prescriptionId.symptom}</Row>
                        </>
                    ) : (<>
                        <Alert className="text-danger">Chưa có thông phiếu khám</Alert>

                    </>)}

                </div> */}
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
                            {thuocs.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.medicineId.name}</td>
                                    <td>{t.quantity}</td>
                                    <td>{t.medicineId.idUnit.name}</td>
                                    <td>{t.medicineId.price} VNĐ</td>
                                    <td>{t.medicineId.price * t.quantity} VNĐ</td>
                                </tr>
                            ))}
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
                            {dichvus.map((d) => (
                                <tr key={d.serviceId.id}>
                                    <td>{d.id}</td>
                                    <td>{d.serviceId.name}</td>
                                    <td>{d.serviceId.price} VNĐ</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Tổng tiền: {hoadon.payMoney}</h2>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Hình thức thanh toán</Form.Label>
                            <Form.Control as="select" onChange={chonhinhthucthanhtoan}
                                required>
                                <option value="">-- Chọn hình thức thanh toán --</option>
                                {loaipay.map((method) => (
                                    <option value={method.id}>
                                        {method.paymentMethod}
                                    </option>
                                ))}
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
                                <Button onClick={thanhtoanhoadon}> THANH TOÁN </Button>
                            </Form.Group>
                        </Col>

                    </Row>
                </div>
            </section>
        </Container>
    </>)
}
export default ThanhToan