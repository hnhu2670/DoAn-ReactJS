import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Image, Row, Table } from "react-bootstrap"
import { MyUserContext } from "../../App";
import { parseISO, isPast, format } from 'date-fns';
import "../../resources/css/dkLam.css"
import apis, { authApi, endpoints } from "../../configs/apis";
import { useNavigate } from "react-router-dom";
import TypeButton from "../../button/Button";
const DKLam = () => {
    const [user] = useContext(MyUserContext);
    const [schedule, setschedule] = useState({
        IdUser: user.id,
        thu2ca1: "2002-11-16",
        thu2ca2: "2002-11-16",
        thu2ca3: "2002-11-16",
        thu3ca1: "2002-11-16",
        thu3ca2: "2002-11-16",
        thu3ca3: "2002-11-16",
        thu4ca1: "2002-11-16",
        thu4ca2: "2002-11-16",
        thu4ca3: "2002-11-16",
        thu5ca1: "2002-11-16",
        thu5ca2: "2002-11-16",
        thu5ca3: "2002-11-16",
        thu6ca1: "2002-11-16",
        thu6ca2: "2002-11-16",
        thu6ca3: "2002-11-16",
        thu7ca1: "2002-11-16",
        thu7ca2: "2002-11-16",
        thu7ca3: "2002-11-16",
        thu8ca1: "2002-11-16",
        thu8ca2: "2002-11-16",
        thu8ca3: "2002-11-16",
    });
    const [lichdangky1, setlichdangky1] = useState([]);
    const [lichdangky2, setlichdangky2] = useState([]);
    const [lichdangky3, setlichdangky3] = useState([]);


    const change = (event, field, date) => {
        setschedule((current) => {
            const isChecked = event.target.checked;
            const value = isChecked ? date : "2002-11-16";

            const updatedSchedule = { ...current };
            updatedSchedule[field] = value;

            return updatedSchedule;
        });

    }
    // console.log(schedule.thu2ca1 + "--" + schedule.thu2ca2);
    let nav = useNavigate();


    //
    const moment = require('moment');


    const getNextWeekDates = () => {
        const nextMonday = moment().add(1, 'weeks').startOf('isoWeek');
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = nextMonday.clone().add(i, 'days').format('YYYY-MM-DD');
            dates.push(date);
        }

        return dates;
    };
    useEffect(() => {
        const loadlichdangky1 = async () => {
            try {
                let { data } = await authApi().get(endpoints['lichdangkyca1']);
                const formattedData = data.map(timestamp => {
                    const date = new Date(timestamp);
                    const formattedDate = format(date, "yyyy-MM-dd");
                    return formattedDate;
                });
                setlichdangky1(formattedData);
                //   console.log(formattedData);
            } catch (err) {
                console.log(err);
            }
        };
        const loadlichdangky2 = async () => {
            try {
                let { data } = await authApi().get(endpoints['lichdangkyca2']);
                const formattedData = data.map(timestamp => {
                    const date = new Date(timestamp);
                    const formattedDate = format(date, "yyyy-MM-dd");
                    return formattedDate;
                });
                setlichdangky2(formattedData);
                // console.log(formattedData);
            } catch (err) {
                console.log(err);
            }
        };
        const loadlichdangky3 = async () => {
            try {
                let { data } = await authApi().get(endpoints['lichdangkyca3']);
                const formattedData = data.map(timestamp => {
                    const date = new Date(timestamp);
                    const formattedDate = format(date, "yyyy-MM-dd");
                    return formattedDate;
                });
                setlichdangky3(formattedData);
                // console.log(formattedData);
            } catch (err) {
                console.log(err);
            }
        };


        loadlichdangky1();
        loadlichdangky2();
        loadlichdangky3();
    }, []);
    console.log(lichdangky1)
    const nextWeekDates = getNextWeekDates();
    // console.log(nextWeekDates[1]);
    //


    const dangkyliclam = (evt) => {
        evt.preventDefault();


        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("IdUser", schedule.IdUser);
                formData.append("thu2ca1", schedule.thu2ca1);
                formData.append("thu2ca2", schedule.thu2ca2);
                formData.append("thu2ca3", schedule.thu2ca3);
                formData.append("thu3ca1", schedule.thu3ca1);
                formData.append("thu3ca2", schedule.thu3ca2);
                formData.append("thu3ca3", schedule.thu3ca3);
                formData.append("thu4ca1", schedule.thu4ca1);
                formData.append("thu4ca2", schedule.thu4ca2);
                formData.append("thu4ca3", schedule.thu4ca3);
                formData.append("thu5ca1", schedule.thu5ca1);
                formData.append("thu5ca2", schedule.thu5ca2);
                formData.append("thu5ca3", schedule.thu5ca3);
                formData.append("thu6ca1", schedule.thu6ca1);
                formData.append("thu6ca2", schedule.thu6ca2);
                formData.append("thu6ca3", schedule.thu6ca3);
                formData.append("thu7ca1", schedule.thu7ca1);
                formData.append("thu7ca2", schedule.thu7ca2);
                formData.append("thu7ca3", schedule.thu7ca3);
                formData.append("thu8ca1", schedule.thu8ca1);
                formData.append("thu8ca2", schedule.thu8ca2);
                formData.append("thu8ca3", schedule.thu8ca3);


                // console.log(formData);


                console.log("thanh cong");
                let res = await apis.post(endpoints['addSchedule'], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                    nav("/");
                }
            } catch (error) {
                console.log(error)
            }


        }


        process();
    }


    return (<>
        <Container>
            <h1 className="text-center">Đăng ký làm việc của bác sĩ</h1>
            {/* <div>
                <Row>
                    <Col sm={3}>
                        <Form.Group className="mb-3">
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                </Row>
            </div> */}
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
                <tbody>
                    <tr>
                        <td>Ca sáng</td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[0]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu2ca1", nextWeekDates[0])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[1]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu3ca1", nextWeekDates[1])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[2]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu4ca1", nextWeekDates[2])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[3]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu5ca1", nextWeekDates[3])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[4]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu6ca1", nextWeekDates[4])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[5]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu7ca1", nextWeekDates[5])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky1.includes(nextWeekDates[6]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu8ca1", nextWeekDates[6])}
                                />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Ca chiều</td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[0]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu2ca2", nextWeekDates[0])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[1]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu3ca2", nextWeekDates[1])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[2]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu4ca2", nextWeekDates[2])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[3]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu5ca2", nextWeekDates[3])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[4]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu6ca2", nextWeekDates[4])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[5]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu7ca2", nextWeekDates[5])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky2.includes(nextWeekDates[6]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu8ca2", nextWeekDates[6])}
                                />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Ca tối</td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[0]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu2ca3", nextWeekDates[0])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[1]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu3ca3", nextWeekDates[1])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[2]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu4ca3", nextWeekDates[2])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[3]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu5ca3", nextWeekDates[3])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[4]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu6ca3", nextWeekDates[4])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[5]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu7ca3", nextWeekDates[5])}
                                />
                            )}
                        </td>
                        <td>
                            {lichdangky3.includes(nextWeekDates[6]) ? (
                                <Form.Check
                                    aria-label="option 1"
                                    checked
                                    disabled
                                />
                            ) : (
                                <Form.Check
                                    aria-label="option 1"
                                    onChange={(e) => change(e, "thu8ca3", nextWeekDates[6])}
                                />
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Form.Group className="mb-3">
                <TypeButton onClick={dangkyliclam}>ĐĂNG KÝ</TypeButton>
            </Form.Group>
        </Container>
    </>)
}
export default DKLam



