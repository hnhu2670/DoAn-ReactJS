import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import apis, { authApi, endpoints } from '../configs/apis';
import MySpinner from '../layout/MySpinner';
import { MyUserContext } from '../App';

const Lichsudangky = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      try {
        let response = await authApi().get(endpoints['datlai']);
        if (response.status === 200) {
          const formattedAppointments = response.data.map(appointment => ({
            ...appointment,

          }));
          setAppointments(formattedAppointments);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchAppointments();
  }, []);


  const deleteappointments = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch này?")) {
      // apis.delete(endpoints['deleteappointments'](id))
      console.log(id);
      authApi().delete(endpoints.xoa(id))
        .then(() => {
          setAppointments(appointments.filter((appointment) => appointment.id !== id));
        });
    }
  }

  return (
    <>
      <h1>Lịch sử đăng ký khám của bạn</h1>
      {loading ? (
        <MySpinner />
      ) : (
        <>
          {appointments.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ngày khám</th>
                  <th>Thời gian khám</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{format(new Date(appointment.appointmentDate), 'yyyy-MM-dd')}</td>
                    <td>{format(new Date(appointment.appointmentDate), 'HH:mm:ss')}</td>
                    <td>
                      <button onClick={() => deleteappointments(appointment.id)} className="btn btn-primary"> {/*onClick={() => handleDeleteAppointment(appointment.id)} */}

                        XÓA
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Chưa có lịch sử đăng ký khám</p>
          )}
        </>
      )}
    </>
  );
};

export default Lichsudangky;