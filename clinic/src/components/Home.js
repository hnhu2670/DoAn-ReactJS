import React from 'react';
import '../resources/css/home.css';
import { Col, Container, Row } from 'react-bootstrap';
import Map from './Map';
const Home = () => {
    return (
        <>
            <nav className="index">
                <div className="title">

                    <div className="content ">

                        <h1 className="animated-heading">
                            <span>PHÒNG KHÁM ĐA KHOA PISCES</span>
                        </h1>
                        <p>Nơi chúng tôi chăm sóc sức khỏe và điều trị bệnh nhân với tận tâm và chất lượng cao. Cam kết an toàn, công nghệ tiên tiến và sự lắng nghe để mang lại sự ủng hộ và tin
                            tưởng từ cộng đồng. Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                    </div>
                </div>
            </nav>
            <Container >
                <Row className='home-top text-center'>
                    <div className='mt-5'>
                        <h1>CHÀO MỪNG ĐẾN VỚI PISCES </h1>
                        <span><i>(Mang sức khỏe đến với mọi nhà)</i></span>
                    </div>

                </Row>
                <Row className='mb-3 '>
                    <Col className='p-0'>
                        <img src="https://res.cloudinary.com/dstqvlt8d/image/upload/v1697266201/ekzzsmaojulxtohn4nle.jpg"></img>
                    </Col>
                    <Col style={{ backgroundColor: "#eeefef" }} className='p-0'>
                        <div style={{ padding: 2 + "rem" }}>
                            <div className='m-4'>
                                <h3 className='home-title'>Mục đích</h3>
                                <p>Vì mục tiêu nâng cao sức khỏe và hạnh phúc của mọi người dân Việt Nam.</p>
                            </div>
                            <div className='m-4'>
                                <h3 className='home-title text-right'>Tầm nhìn</h3>
                                <p>Trở thành đơn vị dẫn đầu toàn quốc về lĩnh vực chăm sóc sức khỏe và là thương hiệu chăm sóc sức khỏe đáng tin cậy nhất ở Việt Nam.</p>
                            </div>
                            <div className='m-4'>
                                <h3 className='home-title'>Sứ mệnh</h3>
                                <p>Sứ mệnh của chúng tôi là nâng cao sức khỏe và đời sống của người dân Việt Nam, thông qua một hệ thống bao gồm
                                    các cơ sở chăm sóc sức khỏe tại các thành phố lớn với phương châm sáng tạo, tích hợp và lấy bệnh nhân làm trung tâm.</p>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Map />
                    </Col>
                    <Col>
                        <h3 className='home-title text-center' style={{ margin: "20% 0 0 10%" }}>Hãy đến với chúng tôi ngay hôm nay</h3>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;