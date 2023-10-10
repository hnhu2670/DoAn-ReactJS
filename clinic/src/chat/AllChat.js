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
        const loadAllChatBox = () => {
            const q = query(collection(db, "chat")); // get All document in collection messages
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                let chatItems = [];
                let expenCol = collection(db, "chat");
                let snapshotCount = await getCountFromServer(expenCol);
                let i = snapshotCount.data().count;
                snapshot.forEach((doc) => { // Loop all document in q 
                    chatItems.push(doc.data());
                    console.log(chatItems)
                });
                if (chatItems.length === i) {
                    //Sort object by createdAt
                    chatItems.sort((a, b) => {
                        return a.createdAt - b.createdAt;
                    });
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

    return (
        <>
            <Container>
                <div className="mt-4">
                    {chatItem.map(c => {
                        let url = `/chat/admin/${c.name}`

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