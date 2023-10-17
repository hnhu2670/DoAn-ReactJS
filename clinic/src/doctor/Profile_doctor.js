import { Col, Container, Row, Image, Form, Accordion, ListGroup, Table } from "react-bootstrap"
import TypeButton from "../button/Button"
import "../doctor/Profile_doctor.css"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import apis, { endpoints } from "../configs/apis"
import MySpinner from "../layout/MySpinner"
import "./Profile_doctor.css"
import { MyUserContext } from "../App"
import ImgDoctor from "../resources/image/bgDoctors.png"

const Profile_doctor = () => {

    const [user] = useContext(MyUserContext);
    const { id } = useParams(); //id phải trùng lưu trữ với csdl
    const [doctorId, setDoctor] = useState("");
    const [rating, setRating] = useState([]);
    const [score, setScore] = useState('');
    const [shift, setShift] = useState([]);

    const [load, setLoad] = useState(false)
    const loadDoctor = async () => {
        try {
            let { data } = await apis.get(endpoints['pro-doctor'](id));
            setDoctor(data);
            setLoad(true)
            console.log(data)

        } catch (err) {
            console.log(err);
            setLoad(false)
        }
    };
    // useEffect(() => {

    //     loadDoctor();
    // }, [id]);

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


    useEffect(() => {
        loadDoctor();
        loadRating();
    }, [id])


    const loadlichlam = async () => {
        try {
            let { data } = await apis.get(endpoints['thoigianlamviec'](id));
            setShift(data);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        loadlichlam();
    }, [id])

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
        <img className="banner" src={ImgDoctor}></img>
        <div className="text-center ">
            <h1 className="text-banner">BÁC SĨ</h1>
        </div>
        <Container>
            <section style={{ paddingTop: 10 + "%" }}>
                <div>
                    {/* <h1 className="text-center text-login top-text">THÔNG TIN BÁC SĨ</h1> */}
                    <Row className="bs-thongtin"  >
                        <Col sm={4} className="p-4">
                            <img src={doctorId?.avatar} alt="ảnh" style={{ backgroundColor: "#eeefef" }} />
                        </Col>
                        <Col className="bs-name mt-4">
                            {load === true ? (
                                <>
                                    <p style={{ fontSize: 20 + "px", color: "darkgreen" }} className="mb-3"><i>{doctorId?.rankId?.name}</i></p>
                                    <h3 style={{ fontSize: 35 + "px" }} className="text-success mb-3"> {doctorId?.name}</h3>
                                    <p style={{ fontSize: 20 + "px", color: "darkgreen" }} className="mb-3">Chuyên khoa : {doctorId?.khoaId.name}</p>
                                    <p>(<i>{doctorId?.khoaId?.describe}</i>)</p>
                                    <p style={{ fontSize: 20 + "px", color: "red" }} className="mb-3 mt-4">Giá khám : {(doctorId?.rankId?.price).toLocaleString("vi-VN") + " VNĐ"}</p>

                                </>

                            ) : (
                                <MySpinner />
                            )}
                        </Col>
                        <Col className="bs-lichkham mt-4" sm={5}>
                            <h4 style={{ fontSize: 20 + "px", color: "darkgreen" }}>Lịch khám bệnh của bác sĩ</h4>
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
                                                        {shift.shiftId?.name} : {shift.shiftId?.start} - {shift.shiftId?.end}
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
                                            <li><img src={c.phieukhamId?.sickpersonId.avatar} alt="ảnh" />
                                                <p style={{ fontWeight: "bold" }} className="mt-4">{c.phieukhamId?.sickpersonId.name}</p>{c.ratingDate.formData}
                                            </li>

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
            </section>
        </Container >
    </>)
}
export default Profile_doctor