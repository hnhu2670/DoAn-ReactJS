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
                setLoad(true)
                // console.log(data);


            } catch (err) {
                console.log(err);
                setLoad(false)
            }
        }

        loadPhieuKham()
    }, []);

    useEffect(() => {
        const loadtoathuoc = async () => {
            try {
                let res = await apis.get(endpoints["toathuoc"](phieu.prescriptionId.id))
                setToaThuoc(res.data)
                console.log("lấy được data")
                console.log("================================")
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        loadtoathuoc()
    }, [phieu]);



    // xuat file pdf
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
            // ten file load ve

            doc.save('hoadon.pdf')
        })
    }

    // load them thong bao thanh toan
    const addNoti = (noti) => {
        try {
            notiDispatch({
                "type": "inc",
                "payload": 1 //so luong tang
            })

            let bill = cookie.load("bill") || null;
            if (bill == null) {
                bill = {}
            }
            cookie.save("bill", JSON.stringify(bill))//luu bill vao cookie "bill"
            console.log(bill + "load thong bao")
            // ktra thong bao da ton tai chua
            if (noti.id in bill) {
                console.log("==========da co=========")
                console.log(id)

            } else {

                console.log("----------chua co---------")
                bill[noti.id] = {
                    "id": noti.id
                }
                console.log(id)
            }
        } catch (error) {
            console.log("------------loi----------" + error)
        }

    }

    const taohoadon = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("IdAppo", id);
                let res = await apis.post(endpoints["taohoadon"], formData);
                console.log("thanh cong post");
                if (res.status === 200) {
                    console.log("tao xong hoa don va roi khoi");
                }
                else {
                    console.log("them that bai")
                }


            } catch (error) {
                console.log(error)
            }
        }
        process();
    }

    if (phieu.id == null) {
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
                    <div ref={pdfRef}>
                        <div>
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
                                    Ngày sinh:  {new Date(phieu.sickpersonId.dod).toLocaleDateString("vi-VN")}
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
                        </div>
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
                    </div>
                    <div>
                        <Button
                            className="btn-normal mr-5"
                            onClick={downPDF}
                        >XUẤT
                        </Button>
                        {/* goi ham truyen id */}
                        <TypeButton className="btn-normal" onClick={() => addNoti(phieu)}>LƯU</TypeButton>

                    </div>
                    <div>
                        <Button onClick={taohoadon}>Tạo hóa đơn và rời khỏi</Button>
                    </div>
                </section>
            </Container >
        </>
    )
}

export default ToaThuoc