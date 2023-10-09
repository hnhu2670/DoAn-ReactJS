import React from 'react'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AuthContext = () => {
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
            // nav("/chatroom")

        }
        else {
            console.log("chua thanh cong")
            // nav("/login-google")
        }

    })
    return (
        <div>AuthContext</div>
    )
}

export default AuthContext