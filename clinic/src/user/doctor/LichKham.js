import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apis, { authApi, endpoints } from '../../configs/apis';
import MyUserContext from "../../App"
import moment from 'moment';
import MySpinner from '../../layout/MySpinner';
const LichKham = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const loadlichkham = async () => {
            try {
                let { data } = await authApi().get(endpoints['lichkham']);
                setAppointments(data)
                setLoading(true)
                console.log(data);

            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        };
        loadlichkham();
    }, []);
    return (

        <Container>
            <section>
                <h1 className="text-center text-login top-text">LỊCH KHÁM BỆNH</h1>
                <Table striped bordered hove className="text-center mb-5">
                    <thead>
                        <tr>
                            <th>Mã phiếu khám</th>
                            <th>Mã bệnh nhân</th>
                            <th>Tên bệnh nhân</th>
                            <th>Ngày khám</th>
                            <th>Giờ khám</th>
                            <th>Triệu chứng</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading === true ? (<>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.sickpersonId.id}</td>
                                    <td>{appointment.sickpersonId.name}</td>
                                    <td> {moment(appointment.appointmentDate).format('DD/MM/YYYY')}</td>
                                    <td>{moment(appointment.appointmentDate).format('HH:mm')}</td>
                                    <td>{appointment.prescriptionId.conclusion}</td>
                                    <td><Link className='text-danger' to={`khambenh/${appointment.id}/phieukham`}
                                        id={appointment.id}>
                                        Khám bệnh
                                    </Link></td>
                                </tr>
                            ))}
                        </>) : (<>
                            <MySpinner />
                        </>)}

                    </tbody>
                </Table>
            </section>
        </Container>
    )
}

export default LichKham