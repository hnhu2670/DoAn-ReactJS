import ChatBox from "./ChatBox"
import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../App';
import React, { useEffect, useContext, useState } from 'react';
import AllChatBox from './AllChat'
// import NewChatBox from './NewChat'
import { db } from "../firebase"
import { addDoc, collection, query, where, onSnapshot, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { Button } from "react-bootstrap";
// import { MDBBtn } from "mdb-react-ui-kit";
import { redirect } from "react-router-dom";

const ChatRoom = () => {

    const [user, dispatch] = useContext(MyUserContext);

    const [chatName, setChatName] = useState([]);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const loadChatRoom = async () => {
            if (user !== null) {
                const q = query(collection(db, "chat"));
                const massages = [];
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    snapshot.forEach((doc) => {
                        massages.push({ ...doc.data(), id: doc.id });
                        if (doc.id === user['username']) {
                            setExist(true);
                        }
                    });
                });
                setChatName(massages);
                return () => unsubscribe;
            }
        }
        loadChatRoom();
    }, []);

    const handleCreateDoc = async () => {
        try {
            await setDoc(doc(db, "chat", user['username']), {
                name: user['username'],
                avatar: user['avatar'],
                createdAt: serverTimestamp(),
                lastMessage: "Bạn cần tư vấn gì ạ?"
            });
            const newCollectionRef = collection(db, "chat", user['username'], "chat");

            await addDoc(newCollectionRef, {
                text: "Bạn cần tư vấn gì ạ?",
                name: "mhoang",
                avatar: "https://res.cloudinary.com/dohcsyfoi/image/upload/v1692291482/zlgufqz0jcozwnup3bsf.jpg",
                createdAt: serverTimestamp(),
                uid: "5"
            });
            setExist(true);
            console.log("Create success");
        } catch (error) {
            console.log(error);
            console.log("Create fail");
        }
    }

    if (user === null) {
        return <Navigate to="/login" replace={true} />;
    }
    else {
        if (user['userRole'] === "ROLE_ADMIN") {
            return (
                <>
                    <div>
                        {exist === true ?
                            <div>
                                <ChatBox />
                                <SendMessage />
                            </div>
                            :
                            <div className="mt-3 d-flex align-items-center justify-content-center">
                                <Button onClick={handleCreateDoc}>Tạo đoạn hội thoại mới</Button>
                            </div>}
                    </div>
                </>
            );
        } else {
            return (
                <div>
                    <AllChatBox />
                </div>

            );
        }

    };
}

export default ChatRoom;