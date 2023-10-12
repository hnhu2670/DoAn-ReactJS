import { useContext, useState } from "react";
import { Accordion, Button, Container, Form, Row, Table } from "react-bootstrap"
import apis, { authApi, endpoints } from "../../configs/apis";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./XNLichKham.css"
import { MyUserContext } from "../../App";




const XNKham = () => {
    const [lichkhamchuaxatnhan, setlichkhamchuaxatnhan] = useState([]);
    const [phieubenh, setPheubenh] = useState([]);
    const [bacsi , setBacSi] = useState([]);
    const [idPhieu , setidPhieu] = useState(null);
    const [phieukham , setPhieuKham] = useState(null);
    const [yta]  = useContext(MyUserContext)

    


    const loadBacSi = async (idPhieu) => {
        try {
            let { data } = await apis.get(endpoints['laybacsikhambenh'](idPhieu));
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

    useEffect(() => {   
        const loadlichkham = async () => {
            try {
                let { data } = await apis.get(endpoints['lichkhamchuaxatnhan']);
                setlichkhamchuaxatnhan(data);
    
    
            } catch (err) {
                console.log(err);
            }
        }; 
        loadlichkham();
    }, []);

    useEffect(() => { 
        if(idPhieu){
            loadBacSi(idPhieu)
            // console.log("danh sach bac si")
            // console.log(bacsi)
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
        if(lichkhamchuaxatnhan){
            motabenhById();
        }
    }, [lichkhamchuaxatnhan]);

    const handlePhieuClick = (id) => {
        setidPhieu(id);
      };

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
                formData.append("IdDoctor",2);
                // console.log(formData.data);
                console.log("thanh cong do");
                let res = await authApi().post(endpoints["xacnhanbacsi"](id), formData);
                console.log(res);
                if(res.data == true){
                    alert(`Gửi mail thành công`);
                    const templateId = 'template_6c5dkwu';
                    const serviceID = 'service_clinic2002';
                    sendFeedback(serviceID, templateId, { tenbenhnhan:"T", ngaykham: "10/10/2019", giokham: "09:00:00" ,tenbacsi:"D",khoabacsi:"Khoa Luật", reply_to: "2051050075duy@ou.edu.vn"})
                    // r.target.reset();
                }
                if(res.data == false){
                    alert(`Gửi mail đăng ký lịch thất bại đến bệnh nhân`);
                    const templateId = 'template_6c5dkwu';
                    const serviceID = 'service_clinic2002';
                    sendFeedback(serviceID, templateId, { tenbenhnhan:"T", ngaykham: "10/10/2019", giokham: "09:00:00" ,tenbacsi:"D",khoabacsi:"Khoa Luật", reply_to: "2051050075duy@ou.edu.vn"})
                    // r.target.reset();
                }

            } catch (error) {
                console.log(error)
            }
            
        }
        process();
    }

    // console.log(lichkhamchuaxatnhan.length)
    // console.log(phieubenh)
    console.log(idPhieu)

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
                            <th>Nút</th>
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
                                <td><Button onClick={() =>handlePhieuClick(d.id)}>Khám</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <div className="add-doctor">

                <Form className="form-addDoctor">
                    <h2 className='col-title'>Chọn bác sĩ khám</h2>

                    <Row className="mb-3">
                        <Form.Label>Mã phiếu khám {phieukham?.id}</Form.Label>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Tên bệnh nhân  {phieukham?.sickpersonId.name}</Form.Label>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Tên y tá {yta.name}</Form.Label>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Chọn bác sĩ</Form.Label>
                        <Form.Control as="select" required>
                            {bacsi.length > 0 ?(bacsi.map((t)=>(
                                 <option key={t.id}>t.name</option>
                            ))):(<option>Không có bác sĩ làm ngày {new Date(phieukham?.appointmentDate).toLocaleDateString("vi-VN")} !!!</option>)};
                        </Form.Control>
                    </Row>
                    <Row>
                        <Button class="btn-click" onClick={() => xatnhanlichkham(phieukham?.id)}>XÁC NHẬN </Button>
                    </Row>

                </Form>
            </div>
        </Container>
    </>)
}
export default XNKham

