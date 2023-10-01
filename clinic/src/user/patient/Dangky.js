import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis, { endpoints } from '../../configs/apis';
import { Button, Form } from 'react-bootstrap';
import MySpinner from '../../layout/MySpinner';
import { MyUserContext } from '../../App';

const Dangky = () => {
    const [user] = useContext(MyUserContext);
    const [appointment, setAppointment] = useState({
        sickpersonId: user.id,
        appointmentDate: "",
        appointmentTime: "",
        motabenh: "",

    });

    const [loading, setLoading] = useState(false);

    let nav = useNavigate();

    const change = (evt, field) => {
        setAppointment(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    const dangky = (evt) => {
        evt.preventDefault();

        const process = async () => {
            let formData = new FormData();
            formData.append("appointmentDate", appointment.appointmentDate);
            formData.append("sickpersonId", appointment.sickpersonId);
            formData.append("appointmentTime", appointment.appointmentTime);
            formData.append("motabenh", appointment.motabenh);




            console.log(formData);

            setLoading(true)
            console.log("thanh cong");
            let res = await apis.post(endpoints['dangky'], formData);
            console.log("thanh cong");
            if (res.status === 200) {
                nav("/");
            }
        }

        process();
    }
    return (
        <>
            <div className='border boder1'>
                <div className="img_booking">
                    <img src="https://res.cloudinary.com/dstqvlt8d/image/upload/v1694342711/Calendar_free_icons_designed_by_Freepik_a3cumj.png" alt="alert" />
                </div>

                <div className='signin'>
                    <h1>Đăng ký lịch khám</h1>

                    <Form onSubmit={dangky} className='contentsignin'>

                        <div className='contentsignin1'>


                            <Form.Group className="mb-3">
                                <Form.Label> Ngày khám :</Form.Label>
                                <Form.Control type="date" value={appointment.appointmentDate} onChange={e => change(e, "appointmentDate")} />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập ngày khám!!!
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Thời gian khám:</Form.Label>
                                <Form.Control as="select" value={appointment.appointmentTime} onChange={e => change(e, "appointmentTime")} >

                                    <option value="09:00:00">09:00:00</option>
                                    <option value="09:30:00">09:30:00</option>
                                    <option value="10:00:00">10:00:00</option>
                                    <option value="10:30:00">10:30:00</option>
                                    <option value="11:00:00">11:00:00</option>
                                    <option value="11:30:00">11:30:00</option>
                                    <option value="12:00:00">12:00:00</option>
                                    <option value="12:30:00">12:30:00</option>
                                    <option value="13:00:00">13:00:00</option>
                                    <option value="13:30:00">13:30:00</option>
                                    <option value="14:00:00">14:00:00</option>
                                    <option value="14:30:00">14:30:00</option>
                                    <option value="15:00:00">15:00:00</option>
                                    <option value="15:30:00">15:30:00</option>
                                    <option value="16:00:00">16:00:00</option>
                                    <option value="16:30:00">16:30:00</option>
                                    <option value="17:00:00">17:00:00</option>
                                    <option value="17:30:00">17:30:00</option>
                                    <option value="18:00:00">18:00:00</option>
                                    <option value="18:30:00">18:30:00</option>
                                    <option value="19:00:00">19:00:00</option>
                                    <option value="19:30:00">19:30:00</option>
                                    <option value="20:00:00">20:00:00</option>
                                    <option value="20:30:00">20:30:00</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn thời gian khám!!!
                                </Form.Control.Feedback>
                            </Form.Group>





                            <Form.Group className="mb-3">
                                {loading === true ? <MySpinner /> : <Button type="submit" variant="danger">Đăng ký</Button>}

                            </Form.Group>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    );
};

export default Dangky;