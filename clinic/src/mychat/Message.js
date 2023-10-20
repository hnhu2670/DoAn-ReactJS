import 'daisyui/dist/full.css';
import { useContext } from 'react';
import { MyUserContext } from '../App';
import moment from 'moment';


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
                        <div className="chat-header">
                            {message.name}
                            <time className="text-xs opacity-50">
                                {new Date(message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                        {/* <div className="chat-footer opacity-50">
                            Seen at 12:46
                        </div> */}
                    </div>
                </div>

                {/* <div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="chat-header">
                            Obi-Wan Kenobi
                            <time className="text-xs opacity-50">12:45</time>
                        </div>
                        <div className="chat-bubble">You were the Chosen One!</div>
                        <div className="chat-footer opacity-50">
                            Delivered
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="chat-header">
                            Anakin
                            <time className="text-xs opacity-50">12:46</time>
                        </div>
                        <div className="chat-bubble">I hate you!</div>
                        <div className="chat-footer opacity-50">
                            Seen at 12:46
                        </div>
                    </div>

                </div> */}
            </section>

        </>

    );
};

export default Message;