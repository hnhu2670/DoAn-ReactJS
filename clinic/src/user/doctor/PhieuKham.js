import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Form, Row } from 'react-bootstrap'
import "./phieuKham.css"
import TypeButton from '../../button/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'
import MySpinner from '../../layout/MySpinner'
import moment from 'moment'
const PhieuKham = () => {
    const nav = useNavigate()
    // id truyen tu trang lich kham {`khambenh/${appointment.id}/phieubenh`}
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [phieu, setPhieuKham] = useState([])
    const [service, setService] = useState([])
    const [loaidichvu, setloaidichvu] = useState({
        chuandoan: "",
        dichvu1: "none",
        dichvu2: "none",
        dichvu3: "none",
        dichvu4: "none"


    })
    // console.log(loaidichvu)
    useEffect(() => {


        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
                setPhieuKham(data)
                setLoading(true)
                console.log(data);


            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        };
        const loadService = async () => {
            try {
                let res = await apis.get(endpoints['dichvu']);
                setService(res.data)
                // setLoading(true)
                // console.log(res.data);
            } catch (error) {
                console.log(error);
                // setLoading(false)
            }
        }


        loadPhieuKham()
        loadService()
    }, []);




    const khamBenh = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("IdAppo", phieu.id);
                formData.append("IdPre", phieu.prescriptionId.id);
                formData.append("chuandoan", loaidichvu.chuandoan);
                formData.append("dichvu1", loaidichvu.dichvu1);
                formData.append("dichvu2", loaidichvu.dichvu2);
                formData.append("dichvu3", loaidichvu.dichvu3);
                formData.append("dichvu4", loaidichvu.dichvu4);
                console.log(formData.data);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["khambenh"], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                    // chuyển qua trang phiếu bệnh ==> id phiếu bệnh
                    nav(`/xemlichkham/phieukham/${phieu.id}/kethuoc`);
                }
            } catch (error) {
                console.log(error)
            }




        }

        if (loaidichvu.chuandoan.trim() === "") {
            alert("Hãy nhập kết luận trước khi cấp thuốc...")
        } else {
            process();
        }

    }


    const change = (event, field) => {
        setloaidichvu((current) => {
            const isChecked = event.target.checked;
            const value = isChecked ? "check" : "none";

            const update = { ...current };
            update[field] = value;
            return update;
        });
    }
    const changechuandoan = (event, field) => {
        const value = event.target.value; // Get the current value of the input field

        setloaidichvu((current) => {
            const update = { ...current };
            update[field] = value;
            return update;
        });
    }
    // console.log(loaidichvu )


    if (phieu === null || loaidichvu === null || service === null) {
        return <MySpinner />
    }
    // console.log(khamBenh)
    return (
        <Container>
            <section id='section-phieukham'>
                <h1 className="text-center text-login top-text">THÔNG TIN KHÁM BỆNH</h1>
                <div id='form-phieukham'>
                    <Row>
                        <Col>Mã phiếu khám: </Col>
                        <Col><p>{phieu.id}</p></Col>
                    </Row>
                    <Row>
                        <Col>Ngày khám: </Col>
                        <Col><p>{moment(phieu.appointmentDate).format('DD/MM/YYYY')}</p></Col>
                    </Row>
                    <Row>
                        <Col>Giờ khám: </Col>
                        <Col><p>{moment(phieu.appointmentDate).format('HH:mm')}</p></Col>
                    </Row>
                </div>
                {loading === true ? (<>
                    <hr />
                    <div id='form-thongtin'>
                        <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin bệnh nhân</h2>
                        <Row>
                            <Col>
                                <Row>
                                    <Col className='col-sm-5'>Họ tên bệnh nhân: </Col>
                                    <Col><p>{phieu.sickpersonId.name}</p></Col>
                                </Row>
                                <Row>
                                    <Col className='col-sm-5'>Ngày sinh: </Col>
                                    <Col><p>{moment(phieu.sickpersonId.dod).format('DD/MM/YYYY')}</p></Col>
                                </Row>
                                <Row>
                                    <Col className='col-sm-5'>Giới tính: </Col>
                                    <Col><p>{phieu.sickpersonId.sex}</p></Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className='col-sm-5'>Địa chỉ: </Col>
                                    <Col><p>{phieu.sickpersonId.address}</p></Col>
                                </Row>
                                <Row>
                                    <Col className='col-sm-5'>Điện thoại: </Col>
                                    <Col><p>{phieu.sickpersonId.phone}</p></Col>
                                </Row>
                                <Row>
                                    <Col className='col-sm-5'>Email: </Col>
                                    <Col><p>{phieu.sickpersonId.emaill}</p></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </>) : (<>
                    <MySpinner />
                </>)}
                <hr />
                {loading === true ? (<>
                    <div id='form-benhnhan'>
                        <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Chuẩn đoán bệnh</h2>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Triệu chứng</Form.Label>
                                <Form.Control type="text" placeholder="Triệu chứng bệnh"
                                    value={phieu.prescriptionId.conclusion} disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Kết luận của bác sĩ</Form.Label>
                                <Form.Control type="text" placeholder="Kết luận của bác sĩ"
                                    value={loaidichvu.chuandoan}
                                    onChange={e => changechuandoan(e, "chuandoan")}
                                    required
                                />
                            </Form.Group>
                        </Row>
                    </div>
                </>) : (<>
                    <MySpinner />
                </>)}
                <hr />
                <div className="mt-4">
                    <Row>
                        <Col>
                            <Form.Check
                                label={service[0]?.name}
                                aria-label="option 1"
                                onChange={(e) => change(e, "dichvu1")}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label={service[1]?.name}
                                aria-label="option 1"
                                onChange={(e) => change(e, "dichvu2")}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label={service[2]?.name}
                                aria-label="option 1"
                                onChange={(e) => change(e, "dichvu3")}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label={service[3]?.name}
                                aria-label="option 1"
                                onChange={(e) => change(e, "dichvu4")}
                            />
                        </Col>


                    </Row>
                </div>
                <div>
                    <Form.Group className="m-3">
                        <Link className="typebutton" type="submit" onClick={khamBenh} >CẤP THUỐC</Link>
                    </Form.Group>
                </div>
            </section>
        </Container>
    )
}


PhieuKham.propTypes = {}


export default PhieuKham



