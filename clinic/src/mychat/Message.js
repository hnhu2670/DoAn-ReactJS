import 'daisyui/dist/full.css';
import { UserAuth } from "../mychat/context/AuthContext";

const Message = ({ message }) => {
    const { currentUser } = UserAuth();

    console.log(message)
    return (
        <>
            <h1>Trang MESSAGE</h1>
            <section>
                <div>
                    {/* ktra id đang đăng nhập =>  xem người gửi tin nhắn có phải là người dùng hiện tại hay không */}
                    <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={message.avatar} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.name}
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                    </div>
                </div>
            </section>

        </>

    );
};

export default Message;