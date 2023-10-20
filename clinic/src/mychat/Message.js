import 'daisyui/dist/full.css';
import { useContext } from 'react';
import { MyUserContext } from '../App';
import moment from 'moment';
import "./chat.css"

const Message = (props) => {
    // const { currentUser } = UserAuth();
    const { message } = props;
    const [user] = useContext(MyUserContext);
    console.log("mess", message)
    return (
        <>
            <section>
                <div>
                    {/* ktra id đang đăng nhập =>  xem người gửi tin nhắn có phải là người dùng hiện tại hay không */}
                    <div className={`chat ${message.uid === user.id ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={message.avatar} />
                            </div>
                        </div>
                        <div className="chat-header mb-2">
                            {message.name}
                            <time className="text-xs opacity-50 ml-3">
                                {new Date(message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                        {/* <div className="chat-footer opacity-50">
                            Seen at 12:46
                        </div> */}
                    </div>
                </div>


            </section>

        </>

    );
};

export default Message;