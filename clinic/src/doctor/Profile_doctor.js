import { Col, Container, Row, Image, Form, Accordion, ListGroup, Table } from "react-bootstrap"
import TypeButton from "../button/Button"
import "../doctor/Profile_doctor.css"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import apis, { endpoints } from "../configs/apis"
import MySpinner from "../layout/MySpinner"
import "./Profile_doctor.css"
import { MyUserContext } from "../App"
import { format, getDate } from "date-fns"
import FontAwesome from "react-fontawesome"
import sao from "../resources/image/sao.png"
const Profile_doctor = () => {

    const [user] = useContext(MyUserContext);
    const [isbtn, setIsBtn] = useState(false)
    const { id } = useParams(); //id phải trùng lưu trữ với csdl
    const [doctorId, setDoctor] = useState(null);
    const [rating, setRating] = useState([]);
    const [score, setScore] = useState('');
    const [shift, setShift] = useState([]);
    const [shift2, setShift2] = useState([]);



    useEffect(() => {
        const loadDoctor = async () => {
            try {
                let { data } = await apis.get(endpoints['pro-doctor'](id));
                setDoctor(data);

            } catch (err) {
                console.log(err);
            }
        };
        const loadRating = async () => {
            try {
                let { data } = await apis.get(endpoints['rating'](id));
                setRating(data);
                // console.log(data);

                var sum = 0;
                for (let i = 0; i < data.length; i++) {

                    sum += data[i].point;

                }
                // console.log(sum)
                setScore((sum / data.length).toFixed(0));


            } catch (err) {
                console.log(err);
            }
        };

        const getConsecutiveDates = (numberOfDays) => {
            const dates = [];
            const currentDate = new Date();

            for (let i = 0; i < numberOfDays; i++) {
                const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
                dates.push(date.toISOString().split("T")[0]);
            }

            return dates;
        };

        const numberOfDays = 7; // Số ngày liên tiếp cần tạo
        const consecutiveDates = getConsecutiveDates(numberOfDays);

        // console.log(consecutiveDates);

        const loadShift = async () => {
            // const date = format(new Date(shift.dateSchedule), "yyyy-MM-dd");
            for (let day = 0; day < consecutiveDates.length; day++) {
                try {

                    let { data } = await apis.get(endpoints['shift'], {
                        params: {
                            IdDoctor: id,
                            date: consecutiveDates[day]
                        }
                    });
                    if (day == 0) {
                        setShift(data)


                    }
                    // if (day == 1) {
                    //     setShift(data)


                    // }
                    // if (day == 2) {
                    //     setShift(data)


                    // }
                    // if (day == 3) {
                    //     setShift(data)


                    // }
                    // if (day == 4) {
                    //     setShift(data)


                    // }
                    // if (day == 5) {
                    //     setShift(data)


                    // }
                    // if (day == 6) {
                    //     setShift(data)


                    // }
                    // if (day == 7) {
                    //     setShift(data)


                    // }
                    console.log(shift)

                } catch (error) {
                    console.log(error)

                }
            }

        }
        loadDoctor();
        loadRating();
        loadShift()
    }, [id]);

    if (doctorId === null || rating === null || shift === null) {
        return (<>
            <MySpinner />
        </>)
    }
    const buttonClick = () => {
        setIsBtn((prevState) => !prevState)
    }



    return (<>
        <div className="container">
            <div>
                thông tin bác sĩ {id}
                <Row className="bs-thongtin"  >
                    <Col >
                        <Row>
                            <Col className="bs-avatar">
                                <img src={doctorId.avatar} alt="ảnh" />
                            </Col>
                            <Col className="bs-name">
                                <h3>{doctorId.name}</h3>
                                <p>Chuyên khoa </p>

                            </Col>
                        </Row>

                    </Col>

                    <Col className="bs-lichkham">
                        <h4>Lịch khám bệnh của bác sĩ</h4>
                        {shift.map((d) => (
                            <Accordion key={d}>
                                <Accordion.Header>{d.dateSchedule}</Accordion.Header>
                                <Accordion.Body>
                                    {d.shiftId.start} -- {d.shiftId.end}
                                </Accordion.Body>
                            </Accordion>
                            // <h2 key={d}>{d.shiftId.start}
                            //     -- {d.shiftId.end}
                            //     {d.dateSchedule}
                            // </h2>
                        ))}


                    </Col>
                </Row>
            </div>
            <hr></hr>

            <div>
                <h2>ĐÁNH GIÁ CỦA BỆNH NHÂN</h2>
                <div style={{ display: "flex" }}>
                    <p className="mr-1">Điểm đánh giá: {score}</p>

                    {score == 1 ? (
                        <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>) :
                        score === 2 ? (
                            <>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                            </>

                        ) : score === 3 ? (
                            <>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                            </>
                        ) : score === 4 ? (
                            <>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                            </>
                        ) : (
                            <>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                                <img src={sao} style={{ width: 20 + "px", height: 20 + "px" }}></img>
                            </>
                        )
                    }
                </div>






                {rating.map(c => {
                    return <ListGroup.Item >
                        <hr></hr>
                        <Row className="p-1">
                            <ul>
                                {/* <li><img src={c.sickpersonId.avatar} alt="ảnh" /></li> */}
                                <li><p style={{ fontWeight: "bold" }}>{c.sickpersonId.name}</p>{c.ratingDate.formData}</li>
                                <li>{c.value}</li>

                            </ul>
                        </Row>


                    </ListGroup.Item>
                })}


            </div>
        </div >
    </>)
}
export default Profile_doctor