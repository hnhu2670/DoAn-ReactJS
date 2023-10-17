import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { Row } from "react-bootstrap";

const AllChat = () => {
    const [names, setNames] = useState([]);
    // const { currentUser } = UserAuth();

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "newchat"));
                const fetchedNames = querySnapshot.docs.map((doc) => {
                    const { name } = doc.data();
                    return name;
                });
                setNames(fetchedNames);
                console.log(fetchedNames); // Kiểm tra dữ liệu đã lấy được
                console.log("Lấy được danh sách tên");
            } catch (error) {
                console.log(error);
            }
        };

        fetchNames();
    }, []);
    return (
        <div>
            <h1>DANH SÁCH USER</h1>
            {names.map((name) => (
                <Row key={name} style={{ borderBottom: "1px solid black", height: "50px" }}>
                    <Link to={`/chat/${name}`}>{name}</Link>
                </Row>
            ))}
        </div>
    );
};

export default AllChat;

// allchat  => chat-room