import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AllChat from '../../mychat/pages/AllChat'
import ChatRoom from '../../mychat/pages/ChatRoom'
import { MyUserContext } from '../../App';


const ChatApp = () => {
    const [rep, setRep] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const ClickRep = (name) => {
        setRep(name);
    };
    const [messageSent, setMessageSent] = useState(false);
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const [user] = useContext(MyUserContext);
    const [firstchat, setFirstchat] = useState([]);
    useEffect(() => {
        setRep(user.username === firstchat.username ? firstchat.rep : firstchat.username);
    }, []);
    return (
        <>
            <Container className='mt-3 mb-3' style={{ boxShadow: " 0 3px 6px rgba(0,0,0,0.16)" }}>
                <Row>
                    <Col sm={4} style={{ borderRight: "1.5px solid green" }}>
                        <h2 className='m-3' style={{ fontSize: "30px", fontWeight: "bold" }}>Chat</h2>
                        <div style={{ display: "flex" }} className="mb-3">
                            <div className="input-find">
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên cần tìm"
                                    // value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="btn-normal px-3" onClick={() => ClickRep(searchTerm)}>Tìm</button>
                        </div>
                        <AllChat setFirstchat={setFirstchat} ClickRep={ClickRep} messageSent={messageSent} setMessageSent={setMessageSent} />
                    </Col>
                    <Col className='p-0'>
                        <ChatRoom rep={rep} setMessageSent={setMessageSent} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatApp