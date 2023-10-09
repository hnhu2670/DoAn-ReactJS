import React from 'react'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MySpinner from '../../layout/MySpinner';

export default function AuthContext = React.createContext()
export default function AuthProvider({ children }) {
    const [isLoading, setIssLoading] = useState(true)
    const nav = useNavigate([])
    const [user, setUser] = useState({})
    const unsubscibe = auth.onAuthStateChanged((user) => {
        console.log({ user });
        if (user) {
            console.log("dang nhap thanh cong")

            const { displayName, email, uid, phoneURL } = user
            setUser({
                displayName, email, uid, phoneURL
            })
            setIssLoading(true)
            nav("/")

        }
        else {
            console.log("chua thanh cong")
            setIssLoading(false)
            nav("/login-google")
        }

    })
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? (<MySpinner />) : children}
        </AuthContext.Provider>
    )
}

