import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Form, Row } from 'react-bootstrap'
import "./phieuKham.css"
import TypeButton from '../../button/Button'
import { useNavigate, useParams } from 'react-router-dom'
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
    const [khambenh, setKhamBenh] = useState({
        IdPre: phieu.prescriptionId.id,
        IdAppo: phieu.id,
        // IdPre: 1,
        // IdAppo: 1,
        // IdPre: null,
        // IdAppo: null,
        chuandoan: "",
        dichvu1: "none",
        dichvu2: "none",
        dichvu3: "none",
        dichvu4: "none"

    })
    useEffect(() => {

        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
                setPhieuKham(data)
                setLoading(true)
                // console.log(data);

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
    }, [])

    const khamBenh = (evt) => {
        evt.preventDefault();


        const process = async () => {
            try {
                let formData = new FormData();
                // formData.append("IdAppo", khamBenh.IdAppo);
                // formData.append("IdPre", phieu.IdPre);
                // formData.append("IdAppo", null);
                // formData.append("IdPre", null);
                formData.append("chuandoan", khamBenh.chuandoan);
                formData.append("dichvu1", khamBenh.dichvu1);
                formData.append("dichvu2", khamBenh.dichvu2);
                formData.append("dichvu3", khamBenh.dichvu3);
                formData.append("dichvu4", khamBenh.dichvu4);



                // console.log(formData);


                console.log("thanh cong");
                let res = await apis.post(endpoints["khambenh"], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                    nav("/");
                }
            } catch (error) {
                console.log(error)
            }


        }


        process();
    }
    const change = (event, field) => {
        setKhamBenh((current) => {
            const isChecked = event.target.checked;
            const value = isChecked ? "check" : "none";

            const update = { ...current };
            update[field] = value;

            return update;
        })
    }

    if (phieu === null || khambenh === null || service === null) {
        return <MySpinner />
    }
    console.log(khamBenh)
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
                                    value={khamBenh.chuandoan}
                                    onChange={e => change(e, "chuandoan")}
                                />
                            </Form.Group>
                        </Row>
                    </div>
                </>) : (<>
                    <MySpinner />
                </>)}


                <hr />
                <div>
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
                    <Form.Group className="mb-3">
                        <button> CẤP THUỐC</button>
                    </Form.Group>
                </div>

            </section>
        </Container>
    )
}

PhieuKham.propTypes = {}

export default PhieuKham