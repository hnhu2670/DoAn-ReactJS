import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import TypeButton from '../../button/Button'
import ImgStar from "../../resources/image/sao.png"
import { render } from '@testing-library/react'
import { el } from 'date-fns/locale'
import "./danhGia.css"
import { MyUserContext } from '../../App'
import { useParams } from 'react-router-dom'
import apis, { endpoints } from '../../configs/apis'
import { useEffect } from 'react'
const DanhGia = () => {
    const { id } = useParams()
    const [phieukham, setphieukham] = useState([])
    const [danhgia, setdanhgia] = useState({
        phieukhamId: id,
        point: "",
        comment: "",
    });
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
    const loadbacsi = async (id) => {
        try {
            let { data } = await apis.get(endpoints['phieukham'](id));
            setphieukham(data)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if(id){
            loadbacsi(id)
        }  
    }, [id]);

    const change = (event, field) => {
        const value = event.target.value; // Get the current value of the input field

        setdanhgia((current) => {
            const update = { ...current };
            update[field] = value;
            return update;
        });
    }
    const danhgiabacsi = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("phieukhamId", danhgia.phieukhamId);
                formData.append("point", danhgia.point);
                formData.append("comment", danhgia.comment);
                console.log(formData.data);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["danhgia"], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                    // chuyển qua trang phiếu bệnh ==> id phiếu bệnh
                    console.log("danh gia thanh cong")
                    // nav(`/xemlichkham/phieukham/${phieu.id}/kethuoc`);
                }
            } catch (error) {
                console.log(error)
            }




        }


        process();
    }
    console.log(phieukham)
    console.log(danhgia)
    return (
        <Container>
            <section>
                <h1 className="text-center text-login top-text">ĐÁNH GIÁ BÁC SĨ</h1>

                <Row>
                    <Col sm={5}>
                        <img src={phieukham?.doctorId.avatar}></img>
                        <h1>{phieukham?.doctorId.name}</h1>
                    </Col>
                    <Col className='col-danhgia mb-5' >
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Cảm nhận của bạn về bác sĩ: (Thông tin bác sĩ)</Form.Label>
                                <Form.Control as="textarea"
                                    onChange={e => change(e, "comment")}
                                    required>

                                </Form.Control>

                            </Form.Group>
                        </Row>
                        {/* <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Trên thang điểm từ 1-5 bạn sẽ chấm bao nhiêu điểm</Form.Label>
                                <Form.Control type="number"
                                    // value={themthuoc.soluongthuoc}
                                    onChange={e => change(e, "point")}
                                    required>
                                </Form.Control>

                            </Form.Group>
                        </Row> */}
                        <Row>
                        <div class="rating">
                            <input type="radio" id="star5" name="rating" value="5" onChange={e => change(e, "point")} />
                            <label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" onChange={e => change(e, "point")} />
                            <label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" onChange={e => change(e, "point")} />
                            <label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" onChange={e => change(e, "point")} />
                            <label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" onChange={e => change(e, "point")} />
                            <label for="star1"></label>
                        </div>
                        </Row>
                        <Row>
                            <Button onClick={danhgiabacsi} className="btn-note">GỬI ĐÁNH GIÁ</Button>
                        </Row>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}

export default DanhGia