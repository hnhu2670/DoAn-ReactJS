import React from 'react'
import { Alert, Container, Form } from 'react-bootstrap'
import cookie from "react-cookies"
import MySpinner from '../../layout/MySpinner'
import { Link } from 'react-router-dom'
const ThongBao = () => {
    const noti = cookie.load("bill") || null;

    if (noti === null) {
        return <Alert className='text-danger'>Chưa nhận được giá trị</Alert>;
    }
    else {
        console.log(noti)
    }
    return (
        <Container>
            <section>
                <h2>THÔNG BÁO YÊU CẦU THANH TOÁN</h2>
                {Object.values(noti).map((c) => (

                    <div key={c.id}>

                        Ma phieu kham {c.appoId} :
                        <Link to={`/thanhtoan/${c.appoId}`}>Thanh toan</Link>
                    </div>
                ))}
            </section>


        </Container>
    )
}

export default ThongBao