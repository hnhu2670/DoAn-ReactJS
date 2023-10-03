import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { MyUserContext } from '../App';
import { useContext } from 'react';
import { useParams } from "react-router-dom";

const Message = ({ message }) => {
    const [user, dispatch] = useContext(MyUserContext);
    const { username } = useParams();

    if (user !== null) {
        if (user['userRole'] === 'ROLE_ADMIN') {
            if (user['id'] === message.uid) {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <div className="d-flex flex-row justify-content-end">

                                    <div>
                                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                            {message.text}
                                        </p>
                                        <p className="small me-3 mb-3 rounded-3 text-muted">
                                            {message.name}
                                        </p>
                                    </div>
                                    <Image src={message.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )

            }
            else {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <div className="d-flex flex-row justify-content-start">
                                    <Image src={message.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                    <div>
                                        <p className="small p-2 ms-3 mb-1 text-white rounded-3 bg-success">
                                            {message.text}
                                        </p>
                                        <p className="small ms-3 mb-3 rounded-3 text-muted">
                                            {message.name}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )

            }
        }
        else {
            if (username === message.name) {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <div className="d-flex flex-row justify-content-start">
                                    <Image src={message.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                    <div>
                                        <p className="small p-2 ms-3 mb-1 text-white rounded-3 bg-success">
                                            {message.text}
                                        </p>
                                        <p className="small ms-3 mb-3 rounded-3 text-muted">
                                            {message.name}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
            else {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <div className="d-flex flex-row justify-content-end">

                                    <div>
                                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                            {message.text}
                                        </p>
                                        <p className="small me-3 mb-3 rounded-3 text-muted">
                                            {message.name}
                                        </p>
                                    </div>
                                    <Image src={message.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        }
    }



}

export default Message