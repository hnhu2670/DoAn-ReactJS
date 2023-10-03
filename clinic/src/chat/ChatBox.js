import { Container, Alert } from "react-bootstrap";
import Message from "./Message"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase"
import { MyUserContext } from '../App';
import { useContext } from 'react';


const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [user, dispatch] = useContext(MyUserContext);

    const url_collection = "messages/" + user['username'] + "/chat"
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
            </Container>
        );
    }

    return (
        <Container>
            <div className="mt-4">
                {messages.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
        </Container>
    );
}

export default ChatBox;