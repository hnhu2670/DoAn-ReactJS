import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import apis, { endpoints } from '../../configs/apis'
import moment from 'moment'
import MySpinner from '../../layout/MySpinner'
import TypeButton from '../../button/Button'
import "./keThuoc.css"
import { useNavigate, useParams } from 'react-router-dom'
const KeThuoc = () => {
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
            console.log("----------------------------------")
            console.log(res.data)
        } catch (error) {
            console.log(error)




        }
    }
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

    useEffect(() => {
        loadThuoc()
        layphieubenh()
        if (phieubenh.id) {
            loadtoathuoc();
        }
    }, [phieubenh])


    const napthuoc = (evt) => {
        evt.preventDefault();
        const process = async () => {
            try {
                let formData = new FormData();
                formData.append("idAppo", id);
                formData.append("idThuoc", themthuoc.idThuoc);
                formData.append("soluongthuoc", themthuoc.soluongthuoc);
                formData.append("huongdansudung", themthuoc.huongdansudung);
                console.log(formData);
                console.log("thanh cong do");
                let res = await apis.post(endpoints["kethuoc"], formData);
                console.log("thanh cong post");
                if (res.status === 200) {
                    let formAdd = document.getElementById("row-addThuoc")
                    setThemThuoc({
                        idThuoc: '',
                        huongdansudung: '',
                        soluongthuoc: '',
                        idAppo: id,
                        tenthuoc: ''
                    }); 
                    formAdd.style.display = 'none';
                    loadtoathuoc()
                    loadThuoc()
                
                    // setToaThuoc([...toathuoc, res.data]);
                    // setToaThuoc((prevState) => [...prevState, res.data]);
                    // const loadtoathuoc = async () => {
                    //     try {
                    //         let res = await apis.get(endpoints["toathuoc"](phieubenh.id))
                    //         setToaThuoc(res.data)
                    //         console.log("lấy được data")
                    //         console.log("================================")
                    //         console.log(res.data)
                    //     } catch (error) {
                    //         console.log(error)
                    //     }
                    // }
                    // loadtoathuoc()

                }
                else {
                    console.log("them that bai")
                }


            } catch (error) {
                console.log(error)
            }
        }
        process();
    }

    // useEffect(() => {
    //     loadtoathuoc()
    // })
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
        let formAdd = document.getElementById("row-addThuoc")
        if (formAdd.style.display === 'none') {
            // Nếu form đang ẩn, thì hiển thị nó
            formAdd.style.display = 'block';
            console.log("hiện")
        } else {
            // Nếu form đang hiển thị, thì ẩn nó
            formAdd.style.display = 'none';
            console.log("ẩn")
        }
        setThemThuoc((current) => {
            const update = { ...current };
            update[fieldid] = id;
            update[fieldtname] = tenthuoc;
            return update;
        });
    }
    const formClose = () => {
        // let formClose = document.querySelector(".form-close")
        let formAdd = document.getElementById("row-addThuoc")
        // console.log(formClose)
        formAdd.style.display = 'none';
    }
      return (
        
        <Container>
            <section>
                {/* đây là phiếu bênh :idPre */}
                <h2 className='col-title'>Phiếu bệnh số: {phieubenh.id}


                </h2>
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
                <Row id="row-addThuoc">
                    <Form id='form-addThuoc'>
                        <Row>
                            <Col>
                                <h2 className='col-title text-center'>THÊM THUỐC</h2>
                            </Col>
                            <Col sm={1} className='m-2 form-close' onClick={formClose}>X</Col>
                        </Row>
                        <Row className="mb-3">
                            <div className="Logincontent logincontent1">
                                <label htmlFor="username" className='text-black'>Tên thuốc: {themthuoc.tenthuoc}</label>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <div className="Logincontent logincontent1">
                                <label htmlFor="username" className='text-black'>Số lượng thuốc</label>
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
                                <label htmlFor="pwd" className='text-black'>Cách dùng</label>

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
                <Row className='m-4'>
                    {/* id là của phiếu khám */}
                    <TypeButton to={`/kethuoc/toathuoc/${id}`}>XUẤT PHIẾU</TypeButton>
                </Row>

            </section>
        </Container>
    )
}


export default KeThuoc

