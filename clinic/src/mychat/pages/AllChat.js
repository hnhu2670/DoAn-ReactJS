import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { MyUserContext } from "../../App";
const AllChat = (props) => {
    const [names, setNames] = useState([]);
    // const { currentUser } = UserAuth();
    const [user] = useContext(MyUserContext);
    const doituongchat = "doctor1";
    // const doituongchat = "admin";
    // const url = user.username+"-"+doituongchat;
    const url = "ClinnitChat";

    const fetchNames = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, url));
            const fetchedNames = querySnapshot.docs.map((doc) => {
                const { rep, username, repavatar, avatar } = doc.data();
                return { rep, repavatar, username, avatar };
            });
            const uniquePairs = [];

            const uniqueNames = fetchedNames.reduce((unique, chat) => {
                const { rep, username } = chat;
                const key1 = `${rep}-${username}`;
                const key2 = `${username}-${rep}`;
                if ((rep === user.username || username === user.username) && !unique[key1] && !unique[key2]) {
                    unique[key1] = chat;
                }
                return unique;
            }, {});
            const filteredNames = Object.values(uniqueNames);
            setNames(filteredNames);
            props.setFirstchat(filteredNames[0]);
            console.log("all chat", filteredNames);
            // console.log(fetchedNames);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNames();
    }, []);

    console.log(props)

    useEffect(() => {
        if (props.messageSent) {
            fetchNames()
            props.setMessageSent(false);
        }
    }, [props.messageSent]);
    return (
        <>

            <div style={{ height: "60vh", overflowY: "scroll" }}>
                {names.map((chat) => {
                    return (
                        <div key={chat.rep}>
                            <div key={chat.rep} >
                                <Row style={{ borderBottom: "1px solid black", cursor: "pointer" }} className="p-2"
                                >
                                    <Col sm={3} >
                                        <Image src={user.username === chat.username ? chat.repavatar : chat.avatar} roundedCircle />

                                    </Col>
                                    <Col
                                        style={{ marginTop: "5%" }}
                                        onClick={() => props.ClickRep(user.username === chat.username ? chat.rep : chat.username)}
                                    >
                                        {user.username === chat.username ? chat.rep : chat.username}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>

    );
};

export default AllChat;

// allchat  => chat-room