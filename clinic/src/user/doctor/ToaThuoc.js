import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TypeButton from '../../button/Button'
import { useParams } from 'react-router-dom';
import apis, { endpoints } from '../../configs/apis';

const ToaThuoc = () => {
    const { id } = useParams();
    const [phieu, setPhieuKham] = useState([])
    const [toathuoc, setToaThuoc] = useState([])
    useEffect(() => {


        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
                setPhieuKham(data)
                // setLoading(true)
                console.log(data);


            } catch (err) {
                console.log(err);
                // setLoading(false)
            }
        }

        const loadtoathuoc = async () => {
            try {
                let res = await apis.get(endpoints["toathuoc"](id))
                setToaThuoc(res.data)
                console.log("lấy được data")
                console.log("================================")
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadPhieuKham()
        loadtoathuoc()
    }, [id]);

    const xuatpdf = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let res = await apis.get(endpoints["pdf"](id));
                console.log(res)
                // window.location.href = endpoints["pdf"](22);

                // window.location.href = res
                console.log("thanh cong get");
                // if (res.status === 200) {
                // console.log(res.name)


                // }
                // else {
                // console.log("them that bai")
                // }


            } catch (error) {
                console.log(error)
            }
        }
        process();
    }


    return (
        <>
            <Container>
                <section>
                    <h1 className="text-center text-login top-text">TOA THUỐC</h1>
                    {/* <div>
                        Tên bác sĩ: {phieu.doctorId.name}
                    </div>
                    <hr />
                    <div>
                        <Row>
                            <Col>
                                Họ và tên: {phieu.sickpersonId.name}
                            </Col>
                            <Col>
                                Giới tính: {phieu.sickpersonId.sex}
                            </Col>
                            <Col>
                                Ngày sinh:  {phieu.sickpersonId.dod}
                            </Col>
                        </Row>
                        <Row>
                            Điện thoại: {phieu.sickpersonId.phone}
                        </Row>
                        <Row>
                            Địa chỉ: {phieu.sickpersonId.address}
                        </Row>
                        <Row>
                            Chuẩn đoán: {phieu.prescriptionId.symptom}
                        </Row>
                    </div> */}
                    <hr />
                    <div>
                        {toathuoc.map((d) => (
                            <Row>
                                <Col>
                                    Tên thuốc:  {d.medicineId.name}
                                </Col>
                                <Col>
                                    SL: {d.quantity}
                                </Col>
                                <p>Hướng dẫn: {d.instructions}</p>
                            </Row>
                        ))}

                    </div>
                    <hr />
                    <div>
                        <Button onClick={xuatpdf} className="btn-normal mr-5">XUẤT</Button>
                        <TypeButton className="btn-normal">LƯU</TypeButton>

                    </div>
                </section>
            </Container >
        </>
    )
}

export default ToaThuoc