import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import TypeButton from '../../button/Button'
import ImgStar from "../../resources/image/sao.png"
import { render } from '@testing-library/react'
import { el } from 'date-fns/locale'
import "./danhGia.css"
const DanhGia = () => {

    function changeDiem() {
        let diem = 0;
        let bstar = 0;
        let gstar = 0;

        if (diem === "5") {
            bstar = 5;
            gstar = 0;
        }
        else {
            if (diem === "4") {
                bstar = 4;
                gstar = 1;
            }
            else {
                if (diem === "3") {
                    bstar = 3;
                    gstar = 2;
                }
                else {
                    if (diem === "2") {
                        bstar = 2;
                        gstar = 3;
                    }
                    else {
                        if (diem === "1") {
                            bstar = 1;
                            gstar = 4;
                        }
                        else {
                            if (diem === "0") {
                                bstar = 0;
                                gstar = 5;
                            }
                            else return (<>
                                <p>Diem so khong co trong muc danh gia</p>
                            </>)
                        }
                    }
                }
            }
        }

        for (let i = 0; i < bstar; i++) {
            render(<>
                <Row>
                    <img src={ImgStar} />
                </Row>

            </>)
        }
    }


    return (
        <Container>
            <section>
                <h1 className="text-center text-login top-text">ĐÁNH GIÁ BÁC SĨ</h1>

                <Row>
                    <Col sm={5}>
                        ảnh bác sĩ
                    </Col>
                    <Col className='col-danhgia mb-5' >
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Cảm nhận của bạn về bác sĩ: (Thông tin bác sĩ)</Form.Label>
                                <Form.Control as="textarea"
                                    required>

                                </Form.Control>

                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Trên thang điểm từ 1-5 bạn sẽ chấm bao nhiêu điểm</Form.Label>
                                <Form.Control type="number"
                                    // value={themthuoc.soluongthuoc}
                                    // onChange={e => change(e, "soluongthuoc")}
                                    required>
                                </Form.Control>

                            </Form.Group>
                        </Row>
                        <Row>
                            <TypeButton className="btn-note">GỬI ĐÁNH GIÁ</TypeButton>
                        </Row>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}

export default DanhGia