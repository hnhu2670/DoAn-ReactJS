import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap'
import TypeButton from '../../button/Button'
import { useNavigate, useParams } from 'react-router-dom';
import apis, { endpoints } from '../../configs/apis';
import cookie from 'react-cookies';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MySpinner from '../../layout/MySpinner';
import { MyNotiContext } from '../../App';
import "./toaThuoc.css"
const ToaThuoc = () => {
    // id phiếu khám
    const { id } = useParams();
    // phiếu khám
    const [phieu, setPhieuKham] = useState([])
    const [toathuoc, setToaThuoc] = useState([])
    const [load, setLoad] = useState(false)
    const nav = useNavigate([])
    const [, notiDispatch] = useContext(MyNotiContext)
    const [successful, setSuccessful] = useState(false)
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
        setLoad(true);
        const filedown = pdfRef.current;
        html2canvas(filedown).then((canvas) => {
            try {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p', 'mm', 'a4', true);
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(componentWidth / imgWidth, componentHeight / imgHeight);
                const imgX = (componentWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                doc.save('hoadon.pdf');
                setSuccessful(true);
                // nav('/xemlichkham');
            } catch (error) {
                console.error('Lỗi:', error);
                setSuccessful(false);
            }
        });
    };

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
                    nav("/xemlichkham")
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
                <section className='form-download' ref={pdfRef} >
                    <Row>
                        <Col sm={3}>
                            <div className='flex'>
                                <img style={{ width: 120 + "px", height: 100 + "px" }} src='/ClinicReact/static/media/logo.c24d972ba160d78617a2.png' />
                                <h1 className='name-hospital'>PISCES hospital</h1>
                            </div>

                        </Col>
                        <Col>
                            <h1 className="text-center text-login top-text">TOA THUỐC</h1>

                        </Col>
                    </Row>

                    {successful ? (
                        <Alert variant="success">Xuất phiếu thành công</Alert>
                    ) : (
                        console.log("thất bại")
                    )}

                    <div className='mt-5'>

                        <hr />
                        <div>
                            <Row className='mb-2'>
                                <Col>
                                    Họ và tên: <span>{phieu.sickpersonId.name}</span>
                                </Col>
                                <Col>
                                    Giới tính: <span>{phieu.sickpersonId.sex}</span>
                                </Col>
                                <Col>
                                    Ngày sinh:  <span>{new Date(phieu.sickpersonId.dod).toLocaleDateString("vi-VN")}</span>
                                </Col>
                            </Row >
                            <Row className='mb-2' style={{ marginLeft: 12 + "px" }}>
                                Điện thoại: {phieu.sickpersonId.phone}
                            </Row>
                            <Row className='mb-2' style={{ marginLeft: 12 + "px" }}>
                                Địa chỉ: {phieu.sickpersonId.address}
                            </Row>
                            <Row className='mb-2' style={{ marginLeft: 12 + "px" }}>
                                Chuẩn đoán: {phieu.prescriptionId.symptom}
                            </Row>
                        </div>
                        <hr />
                        <div>
                            {toathuoc.map((d) => (<>
                                <Table className='table-toathuoc'>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên thuốc</th>
                                            <th>Số lượng</th>
                                            <th>Đơn vị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>{d.medicineId.name}</td>
                                            <td>{d.quantity}</td>
                                            <td>{d.idUnit?.name}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>Liều dùng: {d.instructions}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                            ))}
                        </div>
                        <div>
                            Người kê toa: <span>BS - {phieu.doctorId.name}</span>
                        </div>
                    </div>
                    <hr />

                </section>
                <Row className='m-3' >
                    <Col><button className="btn-click mr-5" onClick={downPDF}>XUẤT FILE</button></Col>
                    <Col><button className="btn-click" onClick={() => addNoti(phieu)}>GỬI XÁC NHẬN</button></Col>
                    <Col><button className="btn-click" onClick={taohoadon}>Tạo hóa đơn và rời khỏi</button></Col>
                </Row>
            </Container >
        </>
    )
}

export default ToaThuoc