import 'daisyui/dist/full.css';
import { UserAuth } from "../mychat/context/AuthContext";
import { useContext } from 'react';
import { MyUserContext } from '../App';


const Message = (props) => {
    // const { currentUser } = UserAuth();
    const { rep, message } = props;
    const [user] = useContext(MyUserContext);
    console.log(message)
    return (
        <>
            <h1>Trang MESSAGE</h1>
            <section>
                <div>
                    {/* ktra id đang đăng nhập =>  xem người gửi tin nhắn có phải là người dùng hiện tại hay không */}
                    <div className={`chat ${message.uid === user.id ? "chat-end" : "chat-start" }`}>
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