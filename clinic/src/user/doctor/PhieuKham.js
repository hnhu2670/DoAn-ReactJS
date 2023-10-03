import React from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Form, Row } from 'react-bootstrap'
import "./phieuKham.css"
const PhieuKham = props => {
    return (
        <Container>
            <section>

                <h1 className="text-center text-login top-text">THÔNG TIN KHÁM BỆNH</h1>
                <Form id='form-phieukham'>
                    <Row>
                        <Col>Mã phiếu khám: </Col>
                        <Col>77777</Col>
                    </Row>
                    <Row>
                        <Col>Ngày khám: </Col>
                        <Col>77777</Col>
                    </Row>
                    <Row>
                        <Col>Giờ khám: </Col>
                        <Col>77777</Col>
                    </Row>

                </Form>

            </section>
        </Container>
    )
}

PhieuKham.propTypes = {}

export default PhieuKham