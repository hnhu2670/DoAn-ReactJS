import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { AuthProvider } from "./mychat/context/AuthContext";
import Login from "./mychat/pages/LoginGG";
import ChatRoom from "./mychat/pages/ChatRoom";

// 
function Chat() {
    return (
        <AuthProvider>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/login-google" exact element={< Login />} />
                <Route
                    path="/chatroom"
                    element={
                        <ChatRoom />
                    }
                />
            </Routes>

        </AuthProvider>
    );
}

export default Chat;