import { Col, Container, Row, Image, Form, Accordion, ListGroup, Table } from "react-bootstrap"
import TypeButton from "../button/Button"
import "../doctor/Profile_doctor.css"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import apis, { endpoints } from "../configs/apis"
import MySpinner from "../layout/MySpinner"
import "./Profile_doctor.css"
import { MyUserContext } from "../App"
const Profile_doctor = () => {

    const [user] = useContext(MyUserContext);
    const { id } = useParams(); //id phải trùng lưu trữ với csdl
    const [doctorId, setDoctor] = useState("");
    const [rating, setRating] = useState([]);
    const [score, setScore] = useState('');
    const [shift, setShift] = useState([]);



    useEffect(() => {
        const loadDoctor = async () => {
            try {
                let { data } = await apis.get(endpoints['pro-doctor'](id));
                setDoctor(data);
                console.log(data)

            } catch (err) {
                console.log(err);
            }
        };
        loadDoctor();
    }, [id]);

    useEffect(()=>{
        const loadRating = async () => {
            try {
                let { data } = await apis.get(endpoints['rating'](id));
                setRating(data);
                // console.log(data);

                var sum = 0;
                for (let i = 0; i < data.length; i++) {
                    sum += data[i].point;
                }
                console.log((sum / data.length).toFixed(0))
                setScore((sum / data.length).toFixed(0));


            } catch (err) {
                console.log(err);
            }
        };
        loadRating();
    },[id])

    useEffect(()=>{
        const loadlichlam = async () => {
            try {
                let { data } = await apis.get(endpoints['thoigianlamviec'](id));
                setShift(data);
                // console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        loadlichlam();
    },[id])

    if (doctorId === null || rating === null || shift === null) {
        return (<>
            <MySpinner />
        </>)
    }

    // Group shifts based on dateSchedule
    const groupedShifts = [];
    shift.forEach((shift) => {
    const existingGroup = groupedShifts.find((group) => group.dateSchedule === shift.dateSchedule);
    if (existingGroup) {
        existingGroup.shifts.push(shift);
    } else {
        groupedShifts.push({ dateSchedule: shift.dateSchedule, shifts: [shift] });
    }
    });

    return (<>
        <div className="container">
            <div>
                <h1 className="text-center text-login top-text">THÔNG TIN BÁC SĨ</h1>
                <Row className="bs-thongtin"  >
                    <Col >
                        <Row>
                            <Col className="bs-avatar">
                                <img src={doctorId.avatar} alt="ảnh" />
                            </Col>
                            <Col className="bs-name mt-5">
                                <h3 style={{ fontSize: 30 + "px" }}>{doctorId.name}</h3>
                                <p>Chuyên khoa {doctorId.khoaId.name}</p>
                                <p>(<i>{doctorId.khoaId.describe}</i>)</p>
                            </Col>
                        </Row>

                    </Col>

                    <Col className="bs-lichkham">
                    <h4>Lịch khám bệnh của bác sĩ</h4>
                    {groupedShifts
                        .sort((a, b) => new Date(a.dateSchedule) - new Date(b.dateSchedule))
                        .map((group, index) => (
                        <Accordion key={index}>
                            <Accordion.Header>
                            {new Date(group.dateSchedule).toLocaleDateString("en-US")}
                            </Accordion.Header>
                            <Accordion.Body>
                            {group.shifts
                                .sort((a, b) => a.shiftId.id - b.shiftId.id)
                                .map((shift) => (
                                <div key={shift.id}>
                                    {shift.shiftId.name} : {shift.shiftId.start} - {shift.shiftId.end}
                                </div>
                                ))}
                            </Accordion.Body>
                        </Accordion>
                        ))}
                    </Col>
                </Row>
            </div>
            <hr></hr>

            <div>
                <h2 className="m-3" style={{ fontSize: 35 + "px" }}>ĐÁNH GIÁ CỦA BỆNH NHÂN</h2>
                <div className="rating">
                <input type="radio" id="star5" name="rating" value="5" disabled={true} checked={score == 5} />
                <label htmlFor="star5"><span className="star"></span></label>
                <input type="radio" id="star4" name="rating" value="4" disabled={true} checked={score == 4} />
                <label htmlFor="star4"><span className="star"></span></label>
                <input type="radio" id="star3" name="rating" value="3" disabled={true} checked={score == 3} />
                <label htmlFor="star3"><span className="star"></span></label>
                <input type="radio" id="star2" name="rating" value="2" disabled={true} checked={score == 2} />
                <label htmlFor="star2"><span className="star"></span></label>
                <input type="radio" id="star1" name="rating" value="1" disabled={true} checked={score == 1} />
                <label htmlFor="star1"><span className="star"></span></label>
                </div>

                <ListGroup className="my-rating-list">
                    {rating.map((c, index) => {
                        const uniqueId = `star${index + 6}`; // Tạo id duy nhất bắt đầu từ 'star6'
                        return (
                        <ListGroup.Item key={index}>
                            <hr />
                            <Row className="p-1">
                            <ul>
                                <li><img src={c.sickpersonId.avatar} alt="ảnh" /></li>
                                <li><p style={{ fontWeight: "bold" }}>{c.sickpersonId.name}</p>{c.ratingDate.formData}</li>
                                <li>
                                <div className="rating">
                                    <input type="radio" id={uniqueId} name={`rating_${index}`} value={c.point} disabled={true} checked={c.point === 5} />
                                    <label htmlFor={uniqueId}><span className="star"></span></label>
                                    <input type="radio" id={`star${index + 7}`} name={`rating_${index}`} value={c.point} disabled={true} checked={c.point === 4} />
                                    <label htmlFor={`star${index + 7}`}><span className="star"></span></label>
                                    <input type="radio" id={`star${index + 8}`} name={`rating_${index}`} value={c.point} disabled={true} checked={c.point === 3} />
                                    <label htmlFor={`star${index + 8}`}><span className="star"></span></label>
                                    <input type="radio" id={`star${index + 9}`} name={`rating_${index}`} value={c.point} disabled={true} checked={c.point === 2} />
                                    <label htmlFor={`star${index + 9}`}><span className="star"></span></label>
                                    <input type="radio" id={`star${index + 10}`} name={`rating_${index}`} value={c.point} disabled={true} checked={c.point === 1} />
                                    <label htmlFor={`star${index + 10}`}><span className="star"></span></label>
                                </div>
                                </li>
                                <li>{c.value}</li>
                            </ul>
                            </Row>
                        </ListGroup.Item>
                        );
                    })}
                    </ListGroup>

            </div>
        </div >
    </>)
}
export default Profile_doctor