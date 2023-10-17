import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react"
import { UserAuth } from "../mychat/context/AuthContext";
import { db } from "../firebase";

const SendMessage = () => {
    const [value, setValue] = useState("");
    const { currentUser } = UserAuth();
    const newCollectionRef = collection(db, "chat", currentUser.uid, "chatbox");
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (value.trim() === "") {
            alert("Enter valid message!");
            return;
        }

        try {
            // let dbName = currentUser.displayName + " chat Như Lê Thị Huỳnh"
            const { uid, displayName, photoURL } = currentUser;//lấy từ currentUser
            // lưu vào chat
            await addDoc(collection(db, "newchat"), {
                text: value,
                name: displayName,
                avatar: photoURL,
                createdAt: serverTimestamp(),
                uid
            })
            // lưu vào newchat có id trùng vs id của người đăng nhập
            const docRef = doc(db, "newchat", currentUser.uid);

            await setDoc(docRef, {
                text: value,
                name: displayName,
                avatar: photoURL,
                createdAt: serverTimestamp(),
                uid
            });

            // await addDoc(collection(db, "chat"), {
            //     text: value,
            //     name: displayName,
            //     avatar: photoURL,
            //     createdAt: serverTimestamp(),
            //     uid
            // })
        } catch (error) {
            console.log(error);
        }
        setValue("");
    }

    return (
        <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
            send message
            <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
                <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
                <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
            </form>
        </div>
    )
}

export default SendMessage
