import React from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Form, Row } from 'react-bootstrap'
import "./phieuKham.css"
import TypeButton from '../../button/Button'
const PhieuKham = props => {
    return (
        <Container>
            <section id='section-phieukham'>

                <h1 className="text-center text-login top-text">THÔNG TIN KHÁM BỆNH</h1>
                <div id='form-phieukham'>
                    <Row>
                        <Col>Mã phiếu khám: </Col>
                        <Col><p>7777</p></Col>
                    </Row>
                    <Row>
                        <Col>Ngày khám: </Col>
                        <Col><p>7777</p></Col>
                    </Row>
                    <Row>
                        <Col>Giờ khám: </Col>
                        <Col><p>7777</p></Col>
                    </Row>

                </div>
                <hr />
                <div id='form-thongtin'>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Thông tin bệnh nhân</h2>
                    <Row>
                        <Col>
                            <Row>
                                <Col className='col-sm-5'>Họ tên bệnh nhân: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-5'>Ngày sinh: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-5'>Giới tính: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col className='col-sm-5'>Địa chỉ: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-5'>Điện thoại: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                            <Row>
                                <Col className='col-sm-5'>Email: </Col>
                                <Col><p>7777</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <hr />
                <div id='form-benhnhan'>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Chuẩn đoán bệnh</h2>

                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Triệu chứng</Form.Label>
                            <Form.Control type="text" placeholder="Triệu chứng bệnh" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Kết luận của bác sĩ</Form.Label>
                            <Form.Control type="text" placeholder="Kết luận của bác sĩ" />
                        </Form.Group>
                    </Row>
                </div>
                <hr />
                <div>
                    <Row>
                        <Col>
                            <Form.Check
                                label="1"
                                name="group1"
                                type="checkbox"
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label="1"
                                name="group1"
                                type="checkbox"
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label="1"
                                name="group1"
                                type="checkbox"
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label="1"
                                name="group1"
                                type="checkbox"
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