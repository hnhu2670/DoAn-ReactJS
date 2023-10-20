import { useParams } from "react-router-dom";
import ChatBox from "../ChatBox";
import SendMessage from "../SendMessage"
import apis, { endpoints } from "../../configs/apis";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
const ChatRoom = (rep) => {
    // const { rep } = useParams();
    console.log("-----------------", rep)
    const [doituongchat, setdoituongchat] = useState([]);

    const laynguoichat = async (rep) => {
        try {
            let { data } = await apis.get(endpoints.laynguoidung(rep));//gọi rep lúc click chọn ng chat
            setdoituongchat(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (rep) {
            laynguoichat(rep.rep);
        }
    }, [rep]);
    return (
        <>
            < div >
                <Row style={{ borderBottom: " 1px solid lightgray" }} className="py-2">
                    <Col sm={1}>
                        <Image src={doituongchat.avatar} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
                    </Col>
                    <Col style={{ marginTop: "1%", fontSize: "18px" }}>
                        {doituongchat.name}
                    </Col>
                </Row>

                <ChatBox rep={rep} />
                <SendMessage rep={rep} />
            </ div>
        </>

    )
}

export default ChatRoom