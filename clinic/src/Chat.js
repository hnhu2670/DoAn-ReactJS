import { AuthProvider } from "./mychat/context/AuthContext";
import Navbar from "./mychat/Navbar";
import { PrivateRoute } from "./mychat/routes/PrivateRoute";
import ChatRoom from "./mychat/pages/ChatRoom"
import { Route, Routes } from 'react-router-dom';
import LoginGG from './mychat/pages/LoginGG';
function Chat() {
    return (
        <AuthProvider>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/login-google" element={<LoginGG />} />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <ChatRoom />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default Chat;
