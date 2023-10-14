import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import apis, { endpoints } from '../../configs/apis'
import moment from 'moment'
import MySpinner from '../../layout/MySpinner'
import TypeButton from '../../button/Button'
import "./keThuoc.css"
import "../../resources/css/style.css"
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
const KeThuoc = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [dsThuoc, setDsThuoc] = useState([])
    // id của phiếu khám bệnh
    const { id } = useParams()
    const [name, setKw] = useState("");
    const [q] = useSearchParams()

    const [phieubenh, setphieubenh] = useState([])
    const [toathuoc, setToaThuoc] = useState([])
    const [themthuoc, setThemThuoc] = useState({
        idThuoc: '',
        huongdansudung: '',
        soluongthuoc: '',
        idAppo: id,
        tenthuoc: ''

    })

    const search = (evt) => {
        evt.preventDefault();
        nav(`/xemlichkham/phieukham/${id}/kethuoc/?name=${name}`);
    };

    const loadThuoc = async () => {
        try {
            setLoading(true)
            let e = endpoints['thuoc'];
            let nameThuoc = q.get("name");
            if (nameThuoc !== null) {
                e = `${e}?name=${nameThuoc}`;
            }

            let res = await apis.get(e);
            setDsThuoc(res.data);

            console.log(res.data);
        } catch (err) {
            setLoading(false);
            console.log(err);
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
        layphieubenh();

    }, []);
    useEffect(() => {
        loadThuoc();
    }, [q])

    useEffect(() => {
        if (phieubenh.id) {
            loadtoathuoc();
        }

    }, [phieubenh]);

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


    const deletePrescriptionItem = async (id, event) => {
        event.preventDefault(); // Prevent form submission
        if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này?")) {
            console.log(id);
            console.log(endpoints["xoathuoc"](id));
            try {
                await apis.delete(endpoints["xoathuoc"](id));
                console.log('Xóa thành công');
                loadtoathuoc();
                loadThuoc();
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
            }
        }
    };

    const chonthuoc = (fieldid, id, fieldtname, tenthuoc) => {
        console.log(fieldid)
        console.log(id)
        console.log(fieldtname)
        console.log(tenthuoc)
        console.log("=============================================================================do ke thuoc")
        let formAdd = document.getElementById("row-addThuoc")
        if (formAdd.style.display === 'none') {
            formAdd.style.display = 'block';
            console.log("hiện")
            // window.confirm("dung lai")
        } else {
            formAdd.style.display = 'none';
            console.log("ẩn")
            window.confirm("dung lai")
        }
        setThemThuoc((current) => {
            const update = { ...current };
            update[fieldid] = id;
            update[fieldtname] = tenthuoc;
            // window.confirm("dung lai")
            return update;
        });

    }

    const formClose = () => {
        let formAdd = document.getElementById("row-addThuoc")
        formAdd.style.display = 'none';
    }
    return (
        <Container>
            <section>
                <Row>
                    <h1 className="text-center text-login top-text">KÊ THUỐC</h1>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Tìm kiếm thuốc</h2>
                    <Form style={{ display: "flex", width: 100 + "%", width: 96 + "%" }} className='mb-3 ml-3 p-0' onSubmit={search}>
                        <div className='mr-3' style={{ width: 100 + "%" }}>

                            <Form.Control
                                type="text"
                                placeholder="Nhập tên thuốc cần tìm..."
                                value={name}
                                onChange={e => setKw(e.target.value)}

                            />
                        </div>
                        <button className="btn-click" type="submit">🔍 Tìm kiếm</button>

                    </Form>
                    <Form id='table-lichkham'>
                        <Table striped bordered hove className="text-center mb-5">

                            <thead>

                                <tr>

                                    <th>Mã thuốc</th>

                                    <th>Tên thuốc</th>

                                    <th>NSX</th>

                                    <th>HSD</th>

                                    <th>Số lượng</th>

                                    <th>Đơn vị</th>

                                    <th>Thêm thuốc</th>

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
                                                <Button onClick={() => chonthuoc("idThuoc", d.id, "tenthuoc", d.name)}> ➕ </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </>) : (<>
                                    <MySpinner />
                                </>)}
                            </tbody>
                        </Table>
                    </Form>

                </Row>
                <hr />
                <Row>
                    <h2 className='m-3' style={{ fontSize: 30 + "px", fontWeight: "bold" }}>Toa thuốc</h2>
                    <Form className="form-thuoc" >
                        <Table striped bordered hove className="text-center mb-5">
                            <thead>
                                <tr>
                                    <th>Mã thuốc</th>
                                    <th>Tên thuốc</th>
                                    <th>Số lượng</th>
                                    <th>Đơn vị</th>
                                    <th>Hướng dẫn sử dụng</th>
                                    <th>Xóa</th>
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
                                        <td><button onClick={(e) => deletePrescriptionItem(t.id, e)}>❌</button></td>
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
                            <Col sm={1} className='m-2 form-close' onClick={formClose} style={{ cursor: "pointer" }}>❎</Col>
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
                                    className='input-login w-full'
                                    placeholder="Nhập số lượng thuốc"
                                    value={themthuoc.soluongthuoc}
                                    onChange={e => change(e, "soluongthuoc")}
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
                                    required
                                />
                            </div>
                        </Row>
                        <Row className="mb-4">
                            <div className="buttonLogin">
                                <TypeButton onClick={napthuoc}>Thêm</TypeButton>
                            </div>

                        </Row>

                    </Form>

                </Row>

                <Row className='m-4'>
                    {/* id phiếu khám */}
                    <Link className='btn-click' to={`/kethuoc/toathuoc/${id}`}>XUẤT PHIẾU</Link>

                </Row>


            </section>

        </Container>

    )

}



export default KeThuoc


