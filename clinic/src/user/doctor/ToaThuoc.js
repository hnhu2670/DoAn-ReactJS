import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeButton from '../../button/Button'

const ToaThuoc = () => {
    return (
        <>
            <Container>
                <section>
                    <h1 className="text-center text-login top-text">TOA THUỐC</h1>
                    <div>
                        Tên bác sĩ:
                    </div>
                    <hr />
                    <div>
                        <Row>
                            <Col>
                                Họ và tên:
                            </Col>
                            <Col>
                                Giới tính:
                            </Col>
                            <Col>
                                Ngày sinh:
                            </Col>
                        </Row>
                        <Row>
                            Điện thoại:
                        </Row>
                        <Row>
                            Địa chỉ:
                        </Row>
                        <Row>
                            Chuẩn đoán:
                        </Row>
                    </div>
                    <hr />
                    <div>
                        <Row>
                            <Col>
                                Tên thuốc:
                            </Col>
                            <Col>
                                SL:
                            </Col>
                            <p>Hướng dẫn:</p>
                        </Row>
                    </div>
                    <hr />
                    <div>
                        <TypeButton className="btn-normal mr-5">XUẤT</TypeButton>
                        <TypeButton className="btn-normal">LƯU</TypeButton>

                    </div>
                </section>
            </Container >
        </>
    )
}

export default ToaThuoc