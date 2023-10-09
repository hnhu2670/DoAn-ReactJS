import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TypeButton from '../../button/Button'
import { useParams } from 'react-router-dom';
import apis, { endpoints } from '../../configs/apis';
import cookie from 'react-cookies';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MySpinner from '../../layout/MySpinner';
import { MyNotiContext } from '../../App';

const ToaThuoc = () => {
    // id phiếu khám
    const { id } = useParams();
    // phiếu khám
    const [phieu, setPhieuKham] = useState([])
    const [toathuoc, setToaThuoc] = useState([])
    const [load, setLoad] = useState(false)

    const [, notiDispatch] = useContext(MyNotiContext)
    useEffect(() => {


        const loadPhieuKham = async () => {
            try {
                let { data } = await apis.get(endpoints['phieukham'](id));
                setPhieuKham(data)
                // setLoading(true)
                // console.log(data);


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
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadPhieuKham()
        loadtoathuoc()
    }, [id]);



    const pdfRef = useRef()
    const downPDF = () => {
        setLoad(true)
        const filedown = pdfRef.current
        html2canvas(filedown).then((canvas) => {

            // chuyen thanh dang anh
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF('p', 'mm', 'a4', true)
            const componentWidth = doc.internal.pageSize.getWidth()
            const componentHeight = doc.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(componentWidth / imgWidth, componentHeight / imgHeight)
            const imgX = (componentWidth - imgWidth * ratio) / 2
            const imgY = 30
            doc.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            // setLoad(false)
            doc.save('hoadon.pdf')
        })

    }
    // load them thong bao
    const addNoti = (phieu) => {
        notiDispatch({
            "type": "inc",
            "payload": 1
        })
        // luu vao cookies ==> lay bill tu cookie??????????????
        // can co class trong csdl de luu
        let bill = cookie.load("bill") || {};
        cookie.save("bill", bill)
        console.log(bill + "load thong bao")
    }
    if (phieu === null) {
        return (<MySpinner />)
    }

    return (
        <>
            <Container>
                <section className='form-download' >
                    <h1 className="text-center text-login top-text">TOA THUỐC</h1>
                    {/* <div>

                        phiếu bệnh :{phieu.prescriptionId.id}
                    </div> */}
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
                    <div ref={pdfRef}>
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
                        <Button
                            className="btn-normal mr-5"
                            onClick={downPDF}
                        >XUẤT
                        </Button>
                        {/* goi ham truyen id */}
                        <TypeButton className="btn-normal" onClick={() => addNoti(phieu)}>LƯU</TypeButton>

                    </div>
                </section>
            </Container >
        </>
    )
}

export default ToaThuoc