import Message from "./Message";
import { collection, query, onSnapshot, orderBy, limit, doc } from "firebase/firestore";
import { useEffect, useRef, useState, useParams, useContext } from "react";
import { db } from "../firebase";
import { MyUserContext } from "../App";


const ChatBox = (props) => {
    const { rep } = props;
    const messagesEndRef = useRef();
    const [messages, setMassages] = useState([]);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };
    const [user] = useContext(MyUserContext);
    // const doituongchat = rep
    // const url = user.username+"-"+doituongchat;
    // const { currentUser } = UserAuth();
    useEffect(scrollToBottom, [messages])
    const url = "ClinnitChat";
    useEffect(() => {
        // const url_collection = "chat/" + currentUser.name
        // truy vấn (q) để truy xuất dữ liệu từ cơ sở dữ liệu Firestore của Firebase.
        const q = query(
            // db name in firebase
            collection(db, url,),
            orderBy("createdAt"),//sắp xếp theo thời gian 
            limit(50),
        );
        // const docRef = doc(db, "newchat", currentUser.uid);

        // const q = query(collection(db, docRef), orderBy("createdAt"), limit(50));


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
    console.log("chatbox", messages)
    // console.log("user", user.username)
    // console.log("rep", rep)
    return (
        <div className="containerWrap" style={{ height: "65vh", overflowY: "scroll" }}>

            {/* chat room */}
            {/* {messages.map((message) => (

                <Message key={message.id} message={message} />
            ))} */}

            {/* chat private */}

            {messages.map((message) => {
                if ((message.rep === rep.rep && message.username === user.username) || (message.rep === user.username && message.username === rep.rep)) {


                    return <>
                        <Message key={message.id} message={message} />
                    </>


                }
                return null;
            })}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default ChatBox;