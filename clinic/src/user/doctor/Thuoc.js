import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import apis, { endpoints } from '../../configs/apis'
import moment from 'moment'
import MySpinner from '../../layout/MySpinner'
import TypeButton from '../../button/Button'
import "./thuoc.css"
import { useNavigate, useParams } from 'react-router-dom'
const Thuoc = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [dsThuoc, setDsThuoc] = useState([])
    // id của phiếu khám bệnh
    const { id } = useParams()
    const [phieubenh, setphieubenh] = useState([])
    const [toathuoc, setToaThuoc] = useState([])
    const [themthuoc, setThemThuoc] = useState({
        idThuoc: '',
        huongdansudung: '',
        soluongthuoc: '',
        idAppo: id,
        tenthuoc: ''
    })

    useEffect(() => {
        const loadThuoc = async () => {
            try {
                let res = await apis.get(endpoints["thuoc"])
                setDsThuoc(res.data)
                setLoading(true)
                console.log(res.data.id)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }
        const layphieubenh = async () => {
            try {
                let res = await apis.get(endpoints["phieubenh"](id))
                setphieubenh(res.data)
                // console.log("----------------------------------")
                // console.log(res.data)
            } catch (error) {
                console.log(error)


            }
        }
        loadThuoc()
        layphieubenh()
    }, [])

    useEffect(() => {
        const loadtoathuoc = async () => {
            try {
                let res = await apis.get(endpoints["toathuoc"](phieubenh.id))
                setToaThuoc(res.data)
                console.log("lấy được data")
                console.log("================================")
                console.log(res.data)
            } catch (error) {
                console.log(error)


            }
        }
        loadtoathuoc()
    }, [phieubenh])

    const napthuoc = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("idAppo", 14);
                formData.append("idThuoc", themthuoc.idThuoc);
                formData.append("soluongthuoc", themthuoc.soluongthuoc);
                formData.append("huongdansudung", themthuoc.huongdansudung);
                console.log(formData);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["kethuoc"], formData);
                console.log("thanh cong");
                if (res.status === 200) {
                }
                else {
                    console.log("them that thai")
                }

            } catch (error) {
                console.log(error)
            }




        }


        process();
    }

    if (dsThuoc === null) {
        return (<>
            <MySpinner />
        </>)
    }

    const change = (event, field) => {
        const value = event.target.value; // Get the current value of the input field
        console.log(value)
        setThemThuoc((current) => {
            const update = { ...current };
            update[field] = value;
            return update;
        });
    }

    const chonthuoc = (fieldid, id, fieldtname, tenthuoc) => {
        setThemThuoc((current) => {
            const update = { ...current };
            update[fieldid] = id;
            update[fieldtname] = tenthuoc;
            return update;
        });
    }
    // console.log(phieubenh.id)
    // console.log(phieubenh.prescriptionId.id)
    return (
        <Container>
            <section>
                <Row>
                    <h2 className='col-title'>DANH SÁCH THUỐC</h2>
                    <Table striped bordered hove className="text-center mb-5">
                        <thead>
                            <tr>
                                <th>Mã thuốc</th>
                                <th>Tên thuốc</th>
                                <th>NSX</th>
                                <th>HSD</th>
                                <th>Số lượng</th>
                                <th>Đơn vị</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading === true ? (<>
                                {dsThuoc.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.provider}</td>
                                        <td> {moment(d.productionDate).format('DD/MM/YYYY')}</td>
                                        <td>{d.quantity}</td>
                                        <td>{d.idUnit.name}</td>
                                        <td>
                                            <button
                                                onClick={e => chonthuoc("idThuoc", d.id, "tenthuoc", d.name)}
                                            >
                                                Thêm
                                            </button>
                                        </td>


                                    </tr>
                                ))}
                            </>) : (<>
                                <MySpinner />
                            </>)}

                        </tbody>
                    </Table>
                </Row>

                <Row>
                    <h2 className='col-title'>TOA THUỐC</h2>
                    <Form className="form-thuoc" >
                        <Table striped bordered hove className="text-center mb-5">
                            <thead>
                                <tr>
                                    <th>Mã thuốc</th>
                                    <th>Tên thuốc</th>
                                    <th>Số lượng</th>
                                    <th>Đơn vị</th>
                                    <th>Hướng dẫn sử dụng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {toathuoc.map((t) => (
                                    <tr key={t.id}>
                                        <td>{t.medicineId.id}</td>
                                        <td>{t.medicineId.name}</td>
                                        <td>{t.quantity}</td>
                                        <td>{t.medicineId.idUnit.name}</td>
                                        <td>{t.instructions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Form>
                </Row>
                <Row>
                    <Form className='form-addThuoc'>
                        <h2 className='col-title'>THÊM THUỐC</h2>
                        <Row className="mb-3">
                            <div className="Logincontent logincontent1">
                                <label htmlFor="username">Tên thuốc: {themthuoc.tenthuoc}</label>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <div className="Logincontent logincontent1">
                                <label htmlFor="username">Số lượng thuốc</label>
                                <input type="number"
                                    id="username"
                                    className='input-login'
                                    placeholder="Nhập số lượng thuốc"
                                    value={themthuoc.soluongthuoc}
                                    onChange={e => change(e, "soluongthuoc")}
                                    // name="username"
                                    required
                                />
                            </div>
                        </Row>

                        <Row className="mb-4">
                            <div className="Logincontent logincontent2">
                                <label htmlFor="pwd">Cách dùng</label>

                                <input type="text"
                                    id="pwd"
                                    className='input-login'
                                    placeholder="Cách dùng..."
                                    value={themthuoc.huongdansudung}
                                    onChange={e => change(e, "huongdansudung")}
                                    // name="password"
                                    required
                                />
                            </div>
                        </Row>
                        <Row className="mb-4">
                            <div className="buttonLogin">

                                <TypeButton onClick={napthuoc}>
                                    Thêm
                                </TypeButton>


                            </div>
                        </Row>
                    </Form>
                </Row>
            </section>
        </Container>
    )
}

export default Thuoc