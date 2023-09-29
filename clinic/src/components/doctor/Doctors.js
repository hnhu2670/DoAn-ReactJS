import Apis, { endpoints } from "../configs/apis";
// import "./resources/css/style.css";
import "./Doctor.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import ImageDoctor from "./resources/img/bg-home.jpg";
import TypeButton from "../button/Button";
import MySpinner from "../layout/MySpinner"
import ImgDoctor from "../resources/image/bgDoctors.png"


const Doctor = () => {
    const [loading, setLoading] = useState(false);

    const [doctor, setDoctor] = useState(null); // Thay đổi giá trị mặc định thành một mảng rỗng
    const [name, setKw] = useState("");
    const nav = useNavigate();
    const [q] = useSearchParams()

    const search = (evt) => {
        evt.preventDefault();
        nav(`/bacsi/?name=${name}`);
    };
    useEffect(() => {
        const loadDoctor = async () => {
            try {
                setLoading(true)
                let e = endpoints['doctor'];
                let nameDoctor = q.get("name");
                if (nameDoctor !== null) {
                    e = `${e}?name=${nameDoctor}`;
                }

                let res = await Apis.get(e);
                setDoctor(res.data);

                console.log(res.data);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };


        loadDoctor();
    }, [q]);

    if (doctor === null) { // Kiểm tra mảng doctor có dữ liệu hay không
        return <Spinner animation="grow" />;
    }
    return (
        <>
            <img className="banner" src={ImgDoctor}></img>
            <div className="text-center ">
                <h1 className="text-banner">BÁC SĨ</h1>
            </div>
            <Container>

                <Form style={{ display: "flex" }} onSubmit={search} className="form-find">
                    <div className="input-find">
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên bác sĩ cần tìm"
                            value={name}
                            onChange={e => setKw(e.target.value)}

                        />
                    </div>
                    <TypeButton className="btn-normal" type="submit">Tìm kiếm</TypeButton>

                </Form>
                <section className="section-doctor">
                    <Row className="items">
                        {doctor.map((d) => (
                            <Col xs={6} md={3} className="item mb-5" key={d.id}>
                                <Card>
                                    <Card.Img variant="top" src={d.avatar} />
                                    <Card.Body >
                                        <Card.Title>{d.name}</Card.Title>

                                        <Button className="btn-note">
                                            <Link to={`/bacsi/${d.id}`}
                                                id={d.id}>
                                                Chi tiết
                                            </Link>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </section>
            </Container>
        </>
    );
};

export default Doctor;