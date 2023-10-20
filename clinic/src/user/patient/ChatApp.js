import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AllChat from '../../mychat/pages/AllChat'
import ChatRoom from '../../mychat/pages/ChatRoom'


const ChatApp = () => {
    const [rep, setRep] = useState(null)
    const ClickRep = (name) => {
        setRep(name);
    }
    console.log("rep:", rep)
    return (
        <>
            <Container className='mt-3 mb-3' style={{ boxShadow: " 0 3px 6px rgba(0,0,0,0.16)" }}>
                <Row>
                    <Col sm={4} style={{ borderRight: "1.5px solid green" }}>
                        <AllChat ClickRep={ClickRep} />
                    </Col>
                    <Col className='p-0'>
                        <ChatRoom rep={rep} />
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ChatApp