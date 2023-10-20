import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Login from "./mychat/pages/LoginGG";
import ChatRoom from "./mychat/pages/ChatRoom";

// 
function Chat() {
    return (


        <Routes>
            {/* <Route path="/login-google" exact element={< Login />} /> */}
            <Route
                path="/chat/:rep"
                element={
                    <ChatRoom />
                }
            />

        </Routes>


    );
}

export default Chat;