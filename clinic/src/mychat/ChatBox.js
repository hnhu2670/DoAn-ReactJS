import Message from "./Message";
import { collection, query, onSnapshot, orderBy, limit, doc } from "firebase/firestore";
import { useEffect, useRef, useState, useParams } from "react";
import { db } from "../firebase";
import { UserAuth } from "./context/AuthContext";


const ChatBox = () => {
    const { username } = useParams();
    const messagesEndRef = useRef();
    const [messages, setMassages] = useState([]);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };
    const { currentUser } = UserAuth();
    useEffect(scrollToBottom, [messages])

    useEffect(() => {
        // const url_collection = "chat/" + currentUser.name
        // truy vấn (q) để truy xuất dữ liệu từ cơ sở dữ liệu Firestore của Firebase.
        // const q = query(
        //     // db name in firebase
        //     collection(db, url_collection,),
        //     orderBy("createdAt"),//sắp xếp theo thời gian 
        //     limit(50),
        // );
        const docRef = doc(db, "newchat", currentUser.uid);

        const q = query(collection(db, docRef), orderBy("createdAt"), limit(50));


        // trả ra dữ liệu
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chat = [];
            querySnapshot.forEach((doc) => {
                chat.push({ ...doc.data(), id: doc.id });
            });
            setMassages(chat);

        });

        return () => unsubscribe;
    }, []);
    console.log(messages)
    return (
        <div className="pb-44 pt-20 containerWrap">

            {messages.map((message) => (

                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default ChatBox;