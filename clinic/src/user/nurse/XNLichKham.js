import { useState } from "react";
import { Accordion, Button, Container, Form, Row, Table } from "react-bootstrap"
import apis, { endpoints } from "../../configs/apis";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./XNLichKham.css"




const XNKham = () => {
    const [lichkhamchuaxatnhan, setlichkhamchuaxatnhan] = useState([]);
    const [phieubenh, setPheubenh] = useState([]);

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
        motabenhById();
    }, [lichkhamchuaxatnhan]);


    console.log(lichkhamchuaxatnhan.length)
    console.log(phieubenh)

    return (<>
        xác nhận lịch khám
        <Container>
            <Table striped bordered hove className="text-center" r>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Mã bệnh nhân</th>
                        <th>Ngày đăng ký</th>
                        <th>Tên y tá</th>
                        <th>Bác sĩ khám</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {lichkhamchuaxatnhan.map((d, index) => (
                        <tr key={d.id}>
                            <td>{index + 1}</td>
                            <td>{d.id}</td>
                            <td>{d.sickpersonId.id}-{d.sickpersonId.name}</td>
                            <td>{d.appointmentDate}</td>
                            <td>{d.nurseId}</td>
                            <td>{d.doctorId}</td>
                            <td>{d.status === 0 ? "Chưa xác nhận" : "Đã xác nhận"}</td>
                            {/* <td>{phieubenh[index]?.id}-{phieubenh[index]?.conclusion}</td> */}
                            <td>{phieubenh[index]?.conclusion}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="add-doctor">

                <Form className="form-addDoctor">
                    <h2 className='col-title'>Chọn bác sĩ khám</h2>

                    <Row className="mb-3">
                        <Form.Label>Mã phiếu khám</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Mã phiếu khám"
                            required
                            disabled
                        />
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Mã bệnh nhân</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Mã bệnh nhân"
                            required
                            disabled
                        />
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Mã y tá</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Mã y tá"
                            required
                            disabled
                        />
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Chọn bác sĩ</Form.Label>
                        <Form.Control as="select" required>
                            <option value="">Chọn bác sĩ</option>
                            <option></option>
                        </Form.Control>
                    </Row>
                    <Row className="mb-3">
                        <Button >XÁC NHẬN</Button>

                    </Row>

                </Form>
            </div>
        </Container>
    </>)
}
export default XNKham

