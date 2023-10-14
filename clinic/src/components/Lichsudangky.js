import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Form, Table } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import apis, { authApi, endpoints } from '../configs/apis';
import MySpinner from '../layout/MySpinner';
import { MyUserContext } from '../App';
import moment from 'moment';

const Lichsudangky = () => {
  // const [user, dispatch] = useContext(MyUserContext);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const nav = useNavigate();


  const fetchAppointments = async () => {

    try {
      let res = await authApi().get(endpoints['dangky']);
      setAppointments(res.data)
      setLoading(true)
      console.log(res.data);

    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };


  useEffect(() => {
    fetchAppointments();
  }, []);
  if (appointments === null) {
    return (<MySpinner />)
  }
  else {
    console.log(appointments.length)
  }

  const deleteappointments = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch này?")) {
      // apis.delete(endpoints['deleteappointments'](id))
      console.log(id);
      // authApi().delete(endpoints.xoa(id))
      authApi().delete(endpoints["xoa"](id))
        .then(() => {
          setAppointments(appointments.filter((appointment) => appointment.id !== id));
        });
    }
  }

  return (
    <>
      <Container>
        <h1 className="text-center text-login top-text">XEM LỊCH KHÁM</h1>
        {/* <h1>Lịch sử đăng ký khám của bạn</h1> */}
        <Form id='table-lichkham'>
          {appointments.length > 0 ? (
            <Table striped bordered hover className='table-toathuoc'>
              <thead>
                <tr>
                  <th>Ngày khám</th>
                  <th>Thời gian khám</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(e => (
                  <tr key={e.id}>
                    <td>{moment(e.appointmentDate).format('DD/MM/YYYY')}</td>
                    <td>{moment(e.appointmentDate).format('HH:MM:SS')}</td>
                    {/* <td>{format(new Date(appointment.appointmentDate), 'yyyy-MM-dd')}</td> */}
                    {/* <td>{format(new Date(appointment.appointmentDate), 'HH:mm:ss')}</td> */}
                    <td>
                      <Button onClick={() => deleteappointments(e.id)} className="btn btn-primary">
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert>Bạn chưa đăng ký lịch khám</Alert>
          )}
        </Form>



      </Container>

    </>
  );
};

export default Lichsudangky;