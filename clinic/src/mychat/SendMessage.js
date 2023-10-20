import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase";
import { MyUserContext } from "../App";
import apis, { endpoints } from "../configs/apis";
import { Container } from "react-bootstrap";

const SendMessage = (props) => {
    const { rep } = props;
    const [value, setValue] = useState("");
    // const { currentUser } = UserAuth();
    const [user] = useContext(MyUserContext);
    const [doituongchat, setdoituongchat] = useState([]);

    const laynguoichat = async (rep) => {
        try {
            let { data } = await apis.get(endpoints.laynguoidung(rep));//gọi rep lúc click chọn ng chat
            setdoituongchat(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (rep) {
            laynguoichat(rep.rep);
        }
    }, [rep]);
    const urlnguoigui = "ClinnitChat"
    // const urlnguoigui = user.username+"-"+doituongchat.username;
    // const urlnguoinhan = doituongchat.username+"-"+user.username;
    // const newCollectionRef = collection(db, "chat", currentUser.uid, "chatbox");
    // console.log(rep)
    // console.log(doituongchat)
    // console.log(user)

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (value.trim() === "") {
            alert("Enter valid message!");
            return;
        }

        try {
            const { id, username, avatar, name } = user;
            // lưu vào chat
            await addDoc(collection(db, urlnguoigui), {
                text: value,
                name: name,
                username: username,
                avatar: avatar,
                createdAt: serverTimestamp(),
                uid: id,
                rep: doituongchat.username,
                repavatar: doituongchat.avatar
                // rep: { 
                //     username: doituongchat.username,
                //     avatar: doituongchat.avatar
                //   },
            })
        } catch (error) {
            console.log(error);
        }
        setValue("");
    }

    return (
        <div className="bottom-0 w-full mt-3 mb-3 py-3" style={{ borderTop: " 1px solid lightgray" }}>
            <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
                <input value={value} onChange={e => setValue(e.target.value)}
                    className="input focus:outline-none bg-gray-100 rounded-r-none"
                    style={{ width: "85%" }}
                    placeholder="Nhập nội dung tin nhắn....."
                    type="text" />
                <button type="submit" className="w-auto text-black rounded-r-lg px-3 text-sm btn-normal">Send</button>
            </form>
        </div>

    )
}

export default SendMessage