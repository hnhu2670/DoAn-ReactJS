import { useState } from "react";
import { Accordion, Container, Form, Table } from "react-bootstrap"
import apis, { endpoints } from "../../configs/apis";
import { useEffect } from "react";
import { useParams } from "react-router-dom";




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
        </Container>
    </>)
}
export default XNKham

