import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Col, Image, Row } from "react-bootstrap";
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
                if (!unique[key1] && !unique[key2]) {
                    unique[key1] = chat;
                }
                return unique;
            }, {});
            const filteredNames = Object.values(uniqueNames);
            setNames(filteredNames);
            console.log(filteredNames);
            // console.log(fetchedNames);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNames();
    }, []);

    console.log(props)

    // useEffect(() => {
    //     if (names.length > 0) {
    //         const firstChat = names[0];
    //         console.log("ma m nhu", firstChat);
    //         props.ClickRep(user.username === firstChat.username ? firstChat.rep : firstChat.username)
    //     }
    // }, [names]);

    return (
        // <div>
        //     <h1>DANH SÁCH USER</h1>
        //     {names.map((chat) => (
        //     <div key={chat.rep}>
        //         {(user.username === chat.username || user.username === chat.rep) && (
        //         <Row style={{ borderBottom: "1px solid black", height: "50px" }}>
        //         <div key={chat.rep}>
        //             <Row style={{ borderBottom: "1px solid black", height: "50px" }}>
        //             <div className="w-10 rounded-full">
        //                 <img src={user.username === chat.username ? chat.repavatar : chat.avatar} />
        //             </div>
        //             <Link to={`/chat/${user.username === chat.username ? chat.rep : chat.username}`}>
        //                 {user.username === chat.username ? chat.rep : chat.username}
        //             </Link> 
        //             </Row>
        //         </div>
        //         </Row>
        //         )}
        //     </div>
        //     ))}
        // </div>
        <>
            <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Chat</h2>

            <div style={{ height: "60vh", overflowY: "scroll" }}>
                {names.map((chat) => {
                    const checkedUser = [];
                    if (
                        (user.username === chat.username || user.username === chat.rep) && !checkedUser.includes(chat.username)
                    ) {
                        checkedUser.push(chat.username);
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
                                        {/* <div className="w-10 rounded-full">
                                            <img src={user.username === chat.username ? chat.repavatar : chat.avatar} />
                                        </div>
                                        {/* <Link to={`/chat/${user.username === chat.username ? chat.rep : chat.username}`}>
                                            {user.username === chat.username ? chat.rep : chat.username}
                                        </Link> */}
                                        {/* <li onClick={() => props.ClickRep(user.username === chat.username ? chat.rep : chat.username)}>
                                            {user.username === chat.username ? chat.rep : chat.username}
                                        </li>  */}
                                    </Row>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>

    );
};

export default AllChat;

// allchat  => chat-room