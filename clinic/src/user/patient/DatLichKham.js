import { Col, Container, Form, Row } from "react-bootstrap";
import TypeButton from "../../button/Button";
import "./datLichKham.css";
import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import apis, { endpoints } from "../../configs/apis";
import moment from "moment";

const DatLichKham = () => {
    const [user] = useContext(MyUserContext);
    let nav = useNavigate();

    const [appointment, setDatLich] = useState({
        sickpersonId: user.id,
        appointmentDate: "",
        appointmentTime: "",
        dod: user.dod,
        motabenh: ""


    });

    const [minDate, setMinDate] = useState("");
    // const [minTime, setMinTime] = useState("");
    // const [maxTime, setMaxTime] = useState("");
    // Tính toán ngày tối thiểu (hiện tại)
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    console.log(currentTime)
    // const lastTime = "20:00:00"; // Giờ cuối cùng mà người dùng có thể chọn
    useEffect(() => {
        setMinDate(currentDate);
        // setMinTime(currentTime);
        // setMaxTime(lastTime);
    }, []);

    const change = (evt, field) => {
        setDatLich((current) => {
            return { ...current, [field]: evt.target.value };
        });
    }
    const validateFields = () => {
        // const Regex = /^[A-Za-z0-9\s]+$/;

        // if (!Regex.test(appointment.motabenh)) {
        //   alert("Vui lòng nhập mô tả hợp lệ!");
        //   return false;
        // }
        if (appointment.appointmentDate == currentDate) {
            if (appointment.appointmentTime < currentTime) {
                alert("Vui lòng chọn thời gian phù hợp !");
                return false;
            }
        }


        return true;
    };


    const dangky = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("appointmentDate", appointment.appointmentDate);
                formData.append("sickpersonId", appointment.sickpersonId);
                formData.append("appointmentTime", appointment.appointmentTime);
                formData.append("dod", appointment.dod)
                formData.append("motabenh", appointment.motabenh)

                console.log(formData);

                console.log("thanh cong");
                let res = await apis.post(endpoints['dangky'], formData);
                console.log("thanh cong");
                console.log(res.data)
                if (res.status === 200) {
                    nav("/xemlich");
                }
            } catch (error) {
                console.log(error)
            }

        }
        if (validateFields()) {
            process();
            // alert("hop le")
        }
    }

    return (
        <>

            <section id="section-datkham">

                <Container>
                    <h1 className="text-center text-login top-text">ĐẶT LỊCH KHÁM</h1>
                    <Row>
                        <Col sm={7}>
                            <div className="profile-text">

                                <Form id="form-profile" onSubmit={dangky}>

                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên bệnh nhân</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên bệnh nhân"
                                                defaultValue={user.name}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ngày sinh</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ngày sinh"
                                                defaultValue={moment(appointment.dod).format('DD/MM/YYYY')}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập địa chỉ bệnh nhân"
                                                defaultValue={user.address}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Điện thoại</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="Nhập điện thoại bệnh nhân"
                                                    defaultValue={user.phone}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Nhập điện thoại bệnh nhân"
                                                    defaultValue={user.emaill}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ngày khám</Form.Label>
                                                <Form.Control type="date" value={appointment.appointmentDate}
                                                    onChange={e => change(e, "appointmentDate")} required
                                                    min={minDate} />

                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Giờ khám</Form.Label>
                                                <Form.Control as="select" value={appointment.appointmentTime}
                                                    onChange={e => change(e, "appointmentTime")}
                                                    // min={minTime}
                                                    // max={maxTime}
                                                    required>

                                                    <option value="09:00:00">09:00:00</option>
                                                    <option value="09:30:00">09:30:00</option>
                                                    <option value="10:00:00">10:00:00</option>
                                                    <option value="10:30:00">10:30:00</option>
                                                    <option value="11:00:00">11:00:00</option>
                                                    <option value="11:30:00">11:30:00</option>
                                                    <option value="12:00:00">12:00:00</option>
                                                    <option value="12:30:00">12:30:00</option>
                                                    <option value="13:00:00">13:00:00</option>
                                                    <option value="13:30:00">13:30:00</option>
                                                    <option value="14:00:00">14:00:00</option>
                                                    <option value="14:30:00">14:30:00</option>
                                                    <option value="15:00:00">15:00:00</option>
                                                    <option value="15:30:00">15:30:00</option>
                                                    <option value="16:00:00">16:00:00</option>
                                                    <option value="16:30:00">16:30:00</option>
                                                    <option value="17:00:00">17:00:00</option>
                                                    <option value="17:30:00">17:30:00</option>
                                                    <option value="18:00:00">18:00:00</option>
                                                    <option value="18:30:00">18:30:00</option>
                                                    <option value="19:00:00">19:00:00</option>
                                                    <option value="19:30:00">19:30:00</option>
                                                    <option value="20:00:00">20:00:00</option>
                                                    <option value="20:30:00">20:30:00</option>
                                                </Form.Control>

                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Mô tả</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Mô tả bệnh"
                                                style={{ height: '100px' }}
                                                value={appointment.motabenh}
                                                onChange={e => change(e, "motabenh")}
                                                required
                                            />

                                        </Form.Group>


                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3">
                                            <TypeButton type="submit">ĐẶT LỊCH KHÁM</TypeButton>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                        <Col sm={5}>
                            <img src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/form-booking.png" />
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
};

export default DatLichKham;