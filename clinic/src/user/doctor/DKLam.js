import React, { useContext, useEffect, useState } from "react";
import { Accordion, Alert, Button, Col, Container, Form, Image, Row, Tab, Table, Tabs } from "react-bootstrap"
import { MyUserContext } from "../../App";
import { parseISO, isPast, format } from 'date-fns';
import "./DKLam.css"
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
    const [lichdone, setlichdone] = useState([]);
    const [lichlamdangky, setlichlamdangky] = useState([]);


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

    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const currentMonday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentMonday);
            date.setDate(date.getDate() + i);
            const formattedDate = date.toISOString().substring(0, 10);
            dates.push(formattedDate);
        }

        return dates;
    };
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
    const loadlichdone = async () => {
        try {
            let { data } = await authApi().get(endpoints['lichdone']);
            data.forEach((item) => {
                item.dateSchedule = new Date(item.dateSchedule).toISOString().substring(0, 10);
            });
            setlichdone(data);
            //   console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadlichlamdangky = async () => {
        try {
            let { data } = await authApi().get(endpoints['lichlamdangky']);
            data.forEach((item) => {
                item.dateSchedule = new Date(item.dateSchedule).toISOString().substring(0, 10);
            });
            setlichlamdangky(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        if (user) {
            loadlichdangky1();
            loadlichdangky2();
            loadlichdangky3();
            loadlichdone();
            loadlichlamdangky();
        }


    }, [user]);


    // console.log(lichdangky1)
    const nextWeekDates = getNextWeekDates();
    const currentWeekDates = getCurrentWeekDates();
    // console.log(currentWeekDates);
    //


    const dangkyliclam = (evt) => {
        evt.preventDefault();


        const process = async () => {
            if (window.confirm('Bạn có chắc chắn đăng ký lịch làm này không ?')) {
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
                        loadlichdangky1()
                        loadlichdangky2()
                        loadlichdangky3()
                        loadlichlamdangky()
                        alert("Đăng ký lịch làm thành công !!!")
                    }
                } catch (error) {
                    console.log(error)
                }
            }


        }


        process();
    }

    const [success, setSuccess] = useState(false)
    const huy = (id) => {
        const huylich = async () => {
            if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
                try {
                    let { data } = await apis.get(endpoints['huylichlam'](id));
                    console.log(data)
                    alert("Hủy lịch thành công")
                    loadlichdangky1()
                    loadlichdangky2()
                    loadlichdangky3()
                    loadlichlamdangky()
                    setSuccess(true)
                    
                } catch (err) {
                    console.log(err);
                    <Alert>Hủy lịch thất bại</Alert>
                }
            }

        };
        huylich();
    };
    lichlamdangky.sort((a, b) => new Date(a.dateSchedule) - new Date(b.dateSchedule));
    return (<>
        <Container>
            <section>
                <Tabs
                    id="justify-tab-example"
                    className="m-3"
                    justify

                >
                    <Tab eventKey="home" title="LỊCH LÀM HIỆN TẠI">
                        <h1 className="text-center text-login top-text">LỊCH LÀM HIỆN TẠI</h1>
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>Ca/thứ</th>
                                    <th>THỨ 2</th>
                                    <th>THỨ 3</th>
                                    <th>THỨ 4</th>
                                    <th>THỨ 5</th>
                                    <th>THỨ 6</th>
                                    <th>THỨ 7</th>
                                    <th>CHỦ NHẬT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ca sáng</td>
                                    {currentWeekDates.map((date, index) => (
                                        <td key={index}>
                                            {lichdone.some((thu) => thu.dateSchedule.includes(date) && thu.shiftId.id === 1) ? <>&#10003;</> : ""}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Ca chiều</td>
                                    {currentWeekDates.map((date, index) => (
                                        <td key={index}>
                                            {lichdone.some((thu) => thu.dateSchedule.includes(date) && thu.shiftId.id === 2) ? <>&#10003;</> : ""}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Ca tối</td>
                                    {currentWeekDates.map((date, index) => (
                                        <td key={index}>
                                            {lichdone.some((thu) => thu.dateSchedule.includes(date) && thu.shiftId.id === 3) ? <>&#10003;</> : ""}
                                        </td>
                                    ))}
                                </tr>

                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="profile" title="ĐĂNG KÝ LÀM">
                        <h1 className="text-center text-login top-text">ĐĂNG KÝ LÀM</h1>
                        <Table striped bordered hove className="text-center table-addJob" >
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
                                    <td title={moment(nextWeekDates[0]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[1]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[2]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[3]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[4]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[5]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[6]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[0]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[1]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[2]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[3]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[4]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[5]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[6]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[0]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[1]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[2]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[3]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[4]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[5]).format('DD/MM/YYYY')}>
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
                                    <td title={moment(nextWeekDates[6]).format('DD/MM/YYYY')}>
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
                        <Form.Group className="mb-3 text-right">
                            <button class="btn-click " onClick={dangkyliclam}>XÁC NHẬN</button>
                        </Form.Group>
                    </Tab>

                    <Tab eventKey="contact" title="LỊCH VỪA ĐĂNG KÝ">
                        <h1 className="text-center text-login top-text">LỊCH VỪA ĐĂNG KÝ</h1>
                        <Form id='table-list'>
                            <Table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Ngày làm</th>
                                        <th>Ca làm</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết ca</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lichlamdangky.map((t) => (
                                        <tr key={t.id}>
                                            <td>{new Date(t.dateSchedule).toLocaleDateString("vi-VN")}</td>
                                            <td>{t.shiftId.name}</td>
                                            <td>{t.shiftId.start}</td>
                                            <td>{t.shiftId.end}</td>
                                            <td className="bthuy">
                                                <Button onClick={() => huy(t.id)}>❌</Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Form>


                    </Tab>
                </Tabs>
            </section>

        </Container>
    </>)
}
export default DKLam



