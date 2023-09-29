import { useContext } from "react";
import { Col, Container, Form, Image, Row, Table } from "react-bootstrap"
import { MyUserContext } from "../../../App";
import { parseISO, isPast } from 'date-fns';
import Lichsudangky from "../../Lichsudangky";
import "../../resources/css/dkLam.css"
const DKLam = () => {
    const [user] = useContext(MyUserContext);


    return (<>
        <Container>
            <h1 className="text-center">Đăng ký làm việc của bác sĩ</h1>
            <div>
                <Row>
                    <Col sm={3}>
                        <Form.Group className="mb-3">
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Table striped bordered hove className="text-center" r>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thứ Hai</th>
                        <th>Thứ Ba</th>
                        <th>Thứ Tư</th>
                        <th>Thứ Năm</th>
                        <th>Thứ Sáu</th>
                        <th>Thứ Bảy</th>
                        <th>Chủ Nhật</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td>Ca sáng</td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                    </tr>
                    <tr >
                        <td>Ca chiều</td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                    </tr>
                    <tr>
                        <td>Ca tối</td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                        <td><Form.Check aria-label="option 1" /></td>
                    </tr>
                </tbody>
            </Table>

        </Container>
    </>)
}
export default DKLam
