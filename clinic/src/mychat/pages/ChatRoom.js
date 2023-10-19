import { useParams } from "react-router-dom";
import ChatBox from "../ChatBox"
import SendMessage from "../SendMessage"
const ChatRoom = () => {
    const { rep } = useParams();
    console.log(rep)
    return (
        <>
            chat room
            < div >
                <ChatBox rep={rep}/>
                <SendMessage rep={rep}/>
            </ div>
        </>

    )
}

export default ChatRoom