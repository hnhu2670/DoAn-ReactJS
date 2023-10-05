import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import "../paypal/PayPal.css"
import paypal from "../resources/image/bgPayPal.png"
const Pay = () => {
    return (
        <Container>
            <section>
                <h1 className="text-center text-login top-text">THANH TOÁN PAYPAL</h1>
                <Row>
                    <Col>
                        <img src={paypal} style={{ width: 90 + "%" }}></img>
                    </Col>
                    <Col className='mt-2'>
                        <Form id='form-paypal'>
                            <Row className="mb-3">
                                <div className="Logincontent logincontent1">
                                    <label htmlFor="username" className='text-success'>Email</label>
                                    <input type="email"
                                        id="email"
                                        className='input-login'
                                        placeholder="Nhập email..."
                                        required
                                    />
                                </div>
                            </Row>

                            <Row className="mb-4">
                                <div className="Logincontent logincontent2">
                                    <label htmlFor="pwd" className='text-success'>Mật khẩu</label>

                                    <input type="password"
                                        id="pwd"
                                        className='input-login'
                                        placeholder="Nhập mật khẩu..."
                                        name="password"
                                        required />
                                </div>
                            </Row>
                            <Row className="mb-4">
                                <div className="buttonLogin">

                                    <Button type="submit" className="buttonLoginColor">
                                        Thanh toán
                                    </Button>


                                </div>
                            </Row>
                        </Form>
                    </Col>

                </Row>

            </section>
        </Container>
    )
}

export default Pay