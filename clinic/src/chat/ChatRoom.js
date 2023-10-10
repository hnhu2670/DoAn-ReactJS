import SendMessage from "./SendMessage"
import { Navigate } from "react-router-dom";
import { MyUserContext } from '../App';
import React, { useEffect, useContext, useState } from 'react';
import AllChatBox from './AllChat'
import { db } from "../firebase"
import { addDoc, collection, query, where, onSnapshot, serverTimestamp, setDoc, doc, orderBy, limit } from "firebase/firestore";
import { Button } from "react-bootstrap";
// import { MDBBtn } from "mdb-react-ui-kit";
import { redirect } from "react-router-dom";
import NewChat from "./NewChat";

const ChatRoom = () => {

    const [user, dispatch] = useContext(MyUserContext);

    const [chatName, setChatName] = useState([]);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const loadChatRoom = async () => {
            if (user !== null) {
                // const q = query(collection(db, "chat"));
                const q = query(
                    // db name in firebase
                    collection(db, "chat"),
                    orderBy("createdAt"),
                    limit(50),
                );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const chat = [];
                    querySnapshot.forEach((doc) => {
                        chat.push({ ...doc.data(), id: doc.id });
                        if (doc.id === user['username']) {
                            setExist(true);
                        }

                    });
                    setChatName(chat);
                });
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
            const newCollectionRef = collection(db, "chat", user['username'], "chatbox");

            await addDoc(newCollectionRef, {
                text: "CHatchatchat",
                // name: "admin",
                // avatar: "https://res.cloudinary.com/dohcsyfoi/image/upload/v1692291482/zlgufqz0jcozwnup3bsf.jpg",
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
    console.log(user)
    if (user === null) {
        return <Navigate to="/login" replace={true} />;
    }
    else {
        // ktra tra thong tin user
        if (user.roleId.name === "ROLE_ADMIN") {
            return (
                <>
                    <div>
                        {exist === true ?
                            <div>
                                <NewChat />
                                <SendMessage />
                            </div>
                            :
                            <div className="mt-3 d-flex align-items-center justify-content-center">
                                {/* <AllChatBox /> */}
                                <Button onClick={handleCreateDoc}>Tạo đoạn hội thoại mới</Button>
                            </div>}
                    </div>
                </>
            );
        } else {
            return (
                <div>
                    {/* <Button onClick={handleCreateDoc}>click me</Button> */}
                    <AllChatBox />
                </div>

            );
        }

    };
}

export default ChatRoom;