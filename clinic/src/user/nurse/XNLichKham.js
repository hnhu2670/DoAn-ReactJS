import { useContext, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import apis, { authApi, endpoints } from "../../configs/apis";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./XNLichKham.css"
import { MyUserContext } from "../../App";
import moment from "moment";




const XNKham = () => {
    const [lichkhamchuaxatnhan, setlichkhamchuaxatnhan] = useState([]);
    const [phieubenh, setPheubenh] = useState([]);
    const [bacsi, setBacSi] = useState([]);
    const [idPhieu, setidPhieu] = useState(null);
    const [phieukham, setPhieuKham] = useState(null);
    const [yta] = useContext(MyUserContext)
    const [thongtinmail , setThongTinMail] = useState({
        tenbenhnhan:"",
        ngaykham:"",
        giokham:"",
        basi:"",
        khoa:"",
        emaill:""
    })
    const[idbacsi,setIdbacsi]=useState(null);




    const loadBacSi = async (idPhieu) => {
        try {
            let { data } = await apis.get(endpoints['laybacsikhambenh'](idPhieu));
            // console.log(endpoints['laybacsikhambenh'](idPhieu))
            setBacSi(data);


        } catch (err) {
            console.log(err);
        }
    };

    const layPhieuKham = async (idPhieu) => {
        try {
            let { data } = await apis.get(endpoints['phieukham'](idPhieu));
            setPhieuKham(data);


        } catch (err) {
            console.log(err);
        }
    };
    const loadlichkham = async () => {
        try {
            let { data } = await apis.get(endpoints['lichkhamchuaxatnhan']);
            setlichkhamchuaxatnhan(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        loadlichkham();
    }, []);

    useEffect(() => {
        if (idPhieu) {
            loadBacSi(idPhieu)
            console.log("danh sach bac si")
            console.log(bacsi)
            layPhieuKham(idPhieu)
            // console.log("thong tin phieu kham")
            // console.log(phieukham)
        }
    }, [idPhieu]);


    const motabenhById = async () => {
        try {
            const promises = lichkhamchuaxatnhan.map((item) =>
                apis.get(endpoints["phieubenh"](item.id))
            );
            const results = await Promise.all(promises);
            const phieubenhData = results.map((res) => res.data);
            setPheubenh(phieubenhData);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (lichkhamchuaxatnhan) {
            motabenhById();
        }
    }, [lichkhamchuaxatnhan]);

    const handlePhieuClick = (id) => {
        setidPhieu(id);
        let btn = document.querySelector("div.add-doctor")
        if (btn.style.display === 'none') {
            btn.style.display = 'block';
            console.log("hiện")
        } else {
            btn.style.display = 'none';
            console.log("ẩn")
        }
    };
    const formClose = () => {
        let btn = document.querySelector("div.add-doctor")
        btn.style.display = 'none';
    }
    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    const xatnhanlichkham = (id) => {
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("IdDoctor", idbacsi);
                // console.log(formData.data);
                console.log("thanh cong do");
                let res = await authApi().post(endpoints["xacnhanbacsi"](id), formData);                
                if (res.data == true) {
                    alert(`Gửi mail thành công`);
                    // window.confirm("test")
                    let { data } = await apis.get(endpoints['phieukham'](id));
                    setPhieuKham(data);
                    console.log(phieukham);
                    // window.confirm("test")
                    const templateId = 'template_6c5dkwu';
                    const serviceID = 'service_clinic2002';
                    sendFeedback(serviceID, templateId, { tenbenhnhan: thongtinmail.tenbenhnhan, noidung1: "Bạn có lịch hẹn khám tại phòng mạch Piscel vào ngày "+thongtinmail.ngaykham+" vào lúc " + thongtinmail.giokham
                    ,noidung2:"Vui lòng đến trước giờ khám khoảng 15 - 30 phút để chúng tôi có thể phục vụ bạn một cách tốt nhất."
                    ,noidung3:"Bác sĩ của bạn là"+thongtinmail.basi+" chuyên "+thongtinmail.khoa, reply_to: thongtinmail.emaill})
                    // console.log(phieukham);
                }
                if (res.data == false) {
                    alert(`Gửi mail đăng ký lịch thất bại đến bệnh nhân vì quá số lượng bệnh nhân khám trong ngày `+ thongtinmail.ngaykham); 
                    const templateId = 'template_6c5dkwu';
                    const serviceID = 'service_clinic2002';
                    sendFeedback(serviceID, templateId, { tenbenhnhan: thongtinmail.tenbenhnhan, noidung1: "Bạn có đặt lịch khám tại phòng mạch Piscel vào ngày "+thongtinmail.ngaykham+" vào lúc " + thongtinmail.giokham
                    , noidung2: "Tuy nhiên phòng mạch của chúng tôi đã đạt đến số lượng lịch khám vào ngày đó", noidung3: "Hi vọng bạn có thể đặt lịch vào một ngày khác", reply_to: thongtinmail.emaill })
                    if(window.confirm("Có muốn xóa lịch khám của "+thongtinmail.tenbenhnhan+" không ?") === true){
                        let { data } = await authApi().delete(endpoints.huylich(id));
                        console.log("xoa thanh cong")
                    }
                }
                loadlichkham();
                formClose();
            } catch (error) {
                console.log(error)
            }

        }
        process();
    }

    const handleSelectDoctor = (event) => {
        const selectedValue = event.target.value;
        const [selectedDoctorId, selectedDoctorName, selectedKhoaName, selectedTenBenhNhan, selectedNgayKhamInMillis,email] = selectedValue.split(",");
        setIdbacsi(selectedDoctorId);
        let selectedNgayKham = moment.unix(selectedNgayKhamInMillis / 1000);
        setThongTinMail(prevState => ({
          tenbenhnhan: selectedTenBenhNhan,
          ngaykham: selectedNgayKham.format("DD/MM/yyyy"),
          giokham: selectedNgayKham.format("HH:mm"),
          basi: selectedDoctorName,
          khoa: selectedKhoaName,
          emaill:email
        }));
      };

    console.log(bacsi)
    // console.log(idPhieu)
    // console.log(idbacsi)
    console.log(thongtinmail)

    return (<>

        <Container>
            <h1 className="text-center text-login top-text">XÁC NHẬN LỊCH KHÁM</h1>
            <div className="table-wrap">
                <Table striped bordered hove className="text-center table-check" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Mã bệnh nhân</th>
                            <th>Ngày đăng ký</th>
                            <th>Trạng thái</th>
                            <th>Ghi chú</th>
                            <th>🩺</th>
                        </tr>
                    </thead>
                    <tbody className="scroll-table">
                        {lichkhamchuaxatnhan.map((d, index) => (
                            <tr key={d.id}>
                                <td>{index + 1}</td>
                                <td>{d.id}</td>
                                <td>{d.sickpersonId.id}-{d.sickpersonId.name}</td>
                                <td>{new Date(d.appointmentDate).toLocaleDateString("vi-VN")}</td>
                                <td>{d.status === 0 ? "Chưa xác nhận" : "Đã xác nhận"}</td>
                                {/* <td>{phieubenh[index]?.id}-{phieubenh[index]?.conclusion}</td> */}
                                <td>{phieubenh[index]?.conclusion}</td>
                                <td><Button onClick={() => handlePhieuClick(d.id)} className="btn-click">Khám</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="add-doctor">
                <Form className="form-addDoctor">
                    <Row className="mb-3">
                        <Col><h2 className='col-title text-center'>Chọn bác sĩ khám</h2></Col>
                        <Col sm={1} className="mt-3" onClick={formClose} style={{ cursor: "pointer" }}>❌</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Mã phiếu khám:</Col>
                        <Col style={{ fontWeight: "bold" }}>{phieukham?.id}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Tên bệnh nhân:</Col>
                        <Col style={{ fontWeight: "bold" }}>{phieukham?.sickpersonId.name}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Tên y tá:</Col>
                        <Col style={{ fontWeight: "bold" }}>{yta.name}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Chọn bác sĩ:</Col>
                        <Form.Control as="select" required onClick={handleSelectDoctor}>
                        {bacsi.length > 0 ? (
                            bacsi.map((t) => (
                            <option key={t.id} value={`${t.id},${t.name},${t.khoaId.name},${phieukham?.sickpersonId.name},${phieukham?.appointmentDate},${phieukham?.sickpersonId.emaill}`}>
                                {t.name} - {t.khoaId.name}
                            </option>
                            ))
                        ) : (
                            <option>Không có bác sĩ làm ngày {new Date(phieukham?.appointmentDate).toLocaleDateString("vi-VN")} !!!</option>
                        )}
                        </Form.Control>
                        </Row>
                    <Row>
                        <Button className="typebutton" onClick={() => xatnhanlichkham(phieukham?.id)}>XÁC NHẬN </Button>
                    </Row>
                </Form>
            </div>
        </Container>
    </>)
}
export default XNKham

