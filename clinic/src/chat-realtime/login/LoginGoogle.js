import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { auth } from '../../firebase'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const LoginGoogle = () => {
    const fbProvider = new FacebookAuthProvider()
    const ggProvider = new GoogleAuthProvider()


    // login fb
    const handleFbLogin = async () => {
        try {
            await signInWithPopup(auth, fbProvider);

            console.log("thanh cong")
        } catch (error) {
            console.log(error)
        }
    };

    const handleGgLogin = async () => {
        try {
            await signInWithPopup(auth, ggProvider);
            console.log("thanh cong")

        } catch (error) {
            console.log(error)

        }
    };



    return (
        <Container>
            <section>
                <Row className='m-3'>
                    <button onClick={handleGgLogin}>
                        DANG NHAP GOOGLE
                    </button>
                </Row>
                <Row className='m-3'>
                    <button onClick={handleFbLogin}>
                        DANG NHAP FACEBOOK
                    </button>
                </Row>

            </section>
        </Container>
    )
}

export default LoginGoogle