// import {  Col, Container, Form, Row, Table } from "react-bootstrap"
import { Button, Col, Container, Form, Row, Table, Alert } from "react-bootstrap"
import TypeButton from "../../button/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import apis, { endpoints } from "../../configs/apis";
import MySpinner from "../../layout/MySpinner";
import axios from "axios";
import { render } from "@testing-library/react";
import PhieuKham from "../doctor/PhieuKham";

const ThanhToan = () => {
    const nav = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [phieu, setPhieuKham] = useState([])
    const [tongtien, setTongtien] = useState()
    const [phieuBenh, setPhieuBenh] = useState([])
    const [thuocs, setThuocs] = useState([])
    const [dichvus, setDichvus] = useState([])
    const [loaipay, setloaipay] = useState([])
    const [hoadon, sethoadon] = useState([])
    const [thanhtoan, setthanhtoan] = useState({
        idAppo: id,
        loaithanhtoan: "null",
    })
    const nat = useNavigate()
    useEffect(() => {
        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
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
        const loadtien = async () => {
            try {
                let { data } = await apis.get(endpoints['tinhtien'](id));
                setTongtien(data)
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
        loadtien()
    }, [id]);

    useEffect(() => {
        const loadpay = async () => {
            try {
                let { data } = await apis.get(endpoints['loaipayment']);
                setloaipay(data)
                setLoading(true)


            } catch (err) {
                console.log(err);
            }
        };
        loadpay()

    }, []);

    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    const thanhtoanhoadon = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("idAppo", thanhtoan.idAppo);
                formData.append("loaithanhtoan", thanhtoan.loaithanhtoan);
                formData.append("tongtien", tongtien);
                // console.log(formData.data);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["thanhtoan"], formData);
                console.log("thanh cong");
                const templateId = 'template_xhjr5ss';
                const serviceID = 'service_clinic2002';
                // const url = "http://localhost:3000/danhgia/"+phieu.doctorId.id;
                const url = "http://localhost:3000/login"
                sendFeedback(serviceID, templateId, { tenbenhnhan: phieu.sickpersonId.name, link_danh_gia:url,tenbacsi:phieu.doctorId.name,reply_to: phieu.sickpersonId.emaill})
                window.confirm("test")
                // axios.get(res);
                if (res.status === 200) {
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    // get trang bị lỗi 404
                    try {
                        console.log("2")
                        let reslink = await apis.get(endpoints["thanhtoanthanhcong"](thanhtoan.idAppo));
                        console.log("3")
                        if(reslink.data == true){
                            nat("/");
                        }
                        window.location.href = reslink.data;

                    } catch (error) {
                        console.error("Error while fetching reslink:", error);
                        // Xử lý lỗi ở đây nếu cần
                    }

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
    if (phieu === null || thuocs === null || dichvus === null) {
        return (<>
            <MySpinner />
        </>)
    }

    function calculateChange() {
        var customerPayment = parseFloat(document.getElementById('customer-payment').value);
        var totalAmount = parseFloat(tongtien);
        var changeAmount = customerPayment - totalAmount;

        console.log(totalAmount);
        var formattedChangeAmount = formatCurrency(changeAmount);
        document.getElementById('change-amount').value = formattedChangeAmount;
    }

    function formatCurrency(amount) {
        var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        if (amount < 0) {
            return 'Thiếu ' + formatter.format(Math.abs(amount));
        } else {
            return formatter.format(amount);
        }
    }

    console.log(thanhtoan);
    return (<>
        <Container>
            <section>
                <h1 className="text-center text-login top-text">THANH TOÁN HÓA ĐƠN</h1>
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
                                    <td> {formatCurrency(t.medicineId.price)}</td>
                                    <td> {formatCurrency(t.medicineId.price * t.quantity)}</td>
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
                            {dichvus === null ? (
                                <Alert>không có dịch vụ</Alert>
                            ) : (
                                <>
                                    {dichvus.map((d) => (
                                        <tr key={d.serviceId?.id}>
                                            <td>{d.id}</td>
                                            <td>{d.serviceId?.name}</td>
                                            <td>{formatCurrency(d.serviceId?.price)}</td>
                                        </tr>
                                    ))}
                                </>
                            )}

                        </tbody>
                    </Table>
                </div>

                <div>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }} id="total-amount">Tổng tiền: {formatCurrency(tongtien)}</h2>
                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Hình thức thanh toán</Form.Label>
                            <Form.Control as="select" onChange={chonhinhthucthanhtoan} required>
                                <option value="">-- Chọn hình thức thanh toán --</option>
                                {loaipay.map((method) => (
                                    <option value={method.id}>
                                        {method.paymentMethod}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    {thanhtoan.loaithanhtoan == 1 && (
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tiền khách đưa</Form.Label>
                                    <Form.Control
                                        id="customer-payment"
                                        type="text"
                                        placeholder="Tiền khách đưa"
                                        required
                                        onInput={calculateChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tiền trả lại</Form.Label>
                                    <Form.Control
                                        id="change-amount"
                                        type="text"
                                        placeholder="Tiền trả lại"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    <Col className="mt-4">
                        <Form.Group className="mb-3">
                            <Button className="btn-click" onClick={thanhtoanhoadon}>THANH TOÁN</Button>
                        </Form.Group>
                    </Col>
                </div>
            </section>
        </Container>
    </>)
}
export default ThanhToan