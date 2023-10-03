import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate, useParams } from "react-router-dom";
import { MyUserContext } from '../App';
import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import Message from "./Message";
import { Container, Alert } from "react-bootstrap";


const NewChatBox = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const { username } = useParams();
    const [messages, setMessages] = useState([]);

    const url_collection = "messages/" + username + "/chat"
    useEffect(() => {
        const q = query(collection(db, url_collection), orderBy("createdAt"), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const massages = [];
            snapshot.forEach((doc) => {
                massages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(massages);
        });
        return () => unsubscribe;
    }, []);

    if (Object.keys(messages).length === 0) {
        return (
            <Container className="mt-3">
                <Alert variant="success">Hãy bắt đầu đoạn hội thoại</Alert>
                <SendMessage />
            </Container>
        );
    }
    if (user === null) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <Container>
            <div className="mt-4">
                {messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <SendMessage />
        </Container>

    );
}

export default NewChatBox;