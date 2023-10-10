import { Container, Image } from "react-bootstrap";
import { MyUserContext } from '../App';
import { Link } from 'react-router-dom';
// import MySpinner from '../Register_Login/MySpinner.js'
import React, { useEffect, useContext, useState } from 'react';
import { db } from "../firebase"
import { collection, query, where, onSnapshot, orderBy, limit, getDocs, getCountFromServer } from "firebase/firestore";
import {
    MDBCol,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Navigate } from "react-router-dom";
import MySpinner from "../layout/MySpinner";


const AllChatBox = () => {

    const [user, dispatch] = useContext(MyUserContext);
    const [chatboxs, setChatboxs] = useState([]);
    const [chatItem, setChatItem] = useState([]);

    useEffect(() => {
        // load tat ca cac tin nhan
        const loadAllChatBox = () => {
            const q = query(collection(db, "chat")); // get All document in collection messages
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                // mang luu chat
                let chatItems = [];
                // gan db.chat cho expenCol
                let expenCol = collection(db, "chat");
                let snapshotCount = await getCountFromServer(expenCol);
                let i = snapshotCount.data().count;
                snapshot.forEach((doc) => {
                    chatItems.push(doc.data());
                    console.log(chatItems)
                });
                if (chatItems.length === i) {
                    // xep mang theo thoi gian
                    chatItems.sort((a, b) => {
                        return a.createdAt - b.createdAt;
                    });
                    // dao mang de hien tu cu den moi
                    chatItems.reverse();
                    //Update state
                    setChatItem(chatItems);
                }
            })
            return () => unsubscribe;
        }
        loadAllChatBox();
    }, []);

    if (user === null) {
        return <Navigate to="/login" replace={true} />;
    }
    if (chatItem === null || chatItem.length === 0) {
        return <MySpinner />;
    }
    console.log(user)
    return (
        <>
            <Container>
                <div className="mt-4">
                    {chatItem.map(c => {
                        {/* link den tin nhan cua user*/ }
                        let url = `/chat/${c.name}`

                        return <MDBCol className="mb-4 mb-md-0">
                            <div className="p-3">
                                <MDBTypography listUnStyled className="mb-0">
                                    <li className="p-2 border-bottom w-100">
                                        <Link
                                            to={url}
                                            className="d-flex justify-content-between"
                                        >
                                            <div className="d-flex flex-row">
                                                <div>
                                                    <Image src={c.avatar} roundedCircle style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />

                                                </div>
                                                <div className="pt-1 pl-3">
                                                    <p className="text-monospace ">
                                                        {c.name}
                                                    </p>
                                                    <p className="text-monospace ">
                                                        {c.lastMessage}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </MDBTypography>
                            </div>
                        </MDBCol>
                    })}
                </div>
            </Container>
        </>
    );
}

export default AllChatBox;