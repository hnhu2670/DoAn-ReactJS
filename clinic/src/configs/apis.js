import axios from "axios";
import cookie from "react-cookies";


const SERVER_CONTEXT = "/Clinnic";
const SERVER = "http://localhost:8080";
// const SERVER = "http://localhost:8901";

export const endpoints = {

    "medicines": `${SERVER_CONTEXT}/api/mediciens/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/register`,
    "dangky": `${SERVER_CONTEXT}/api/appointments`,
    // "datlai": `${SERVER_CONTEXT}/api/appointments`,
    "xoa": (id) => `${SERVER_CONTEXT}/api/appointments/${id}`,
    "login-google": `${SERVER_CONTEXT}/api/login-google/`,
    "appointments": `${SERVER_CONTEXT}/api/appointments`,
    "isUser": `${SERVER_CONTEXT}/api/isUser/`,
    "up-password": `${SERVER_CONTEXT}/api/up-password/`,
    "addSchedule": `${SERVER_CONTEXT}/api/dangkylichlam`,

    "lichkhamcanthanhtoan": `${SERVER_CONTEXT}/api/nurse/lichkhamcanthanhtoan`,
    "addSchedule": `${SERVER_CONTEXT}/api/dangkylichlam`,
    "lichdangkyca1": `${SERVER_CONTEXT}/api/lichlamdangkyca1`,
    "lichdangkyca2": `${SERVER_CONTEXT}/api/lichlamdangkyca2`,
    "lichdangkyca3": `${SERVER_CONTEXT}/api/lichlamdangkyca3`,
    "lichlamdangky": `${SERVER_CONTEXT}/api/lichlamhdangky`,
    "dichvu": `${SERVER_CONTEXT}/api/service`,
    "thuoc": `${SERVER_CONTEXT}/api/medicines`,
    "lichdone": `${SERVER_CONTEXT}/api/lichlamhientai`,
    "thoigianlamviec": (id) => `${SERVER_CONTEXT}/api/lichlamhientai/${id}`,
    "huylichlam": (id) => `${SERVER_CONTEXT}/api/xemlichlam/huy/${id}`,

    // doctor
    "doctor": `${SERVER_CONTEXT}/api/doctors`,
    "pro-doctor": (id) => `${SERVER_CONTEXT}/api/doctor/${id}`,
    "rating": (id) => `${SERVER_CONTEXT}/api/doctor/${id}/rating`,
    "phieukham": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/${id}/phieukham`,
    "phieubenh": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/${id}/phieubenh`,
    "shift": `${SERVER_CONTEXT}/api/doctor/shift`,
    "lichkham": `${SERVER_CONTEXT}/api/doctor/lichkham`,

    // "lichkham": `${SERVER_CONTEXT}/api/doctor/lichkham`,
    "khambenh": `${SERVER_CONTEXT}/api/doctor/khambenh`,
    "lichsukham": (id) => `${SERVER_CONTEXT}/api/doctor/lichsukham/${id}`,
    "taohoadon": `${SERVER_CONTEXT}/api/doctor/taohoadon`,
    "xoathuoc": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/kethuoc/delete/${id}`,
    "pdf": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/kethuoc/export/${id}`,
    "danhgia": `${SERVER_CONTEXT}/api/doctor/rating`,
    "toathuoc": (id) => `${SERVER_CONTEXT}/api/doctor/phieubenh/${id}/kethuoc`,
    "kethuoc": `${SERVER_CONTEXT}/api/doctor/phieubenh/kethuoc`,
    // nurse
    "lichkhamcanthanhtoan": `${SERVER_CONTEXT}/api/nurse/lichkhamcanthanhtoan`,
    "lichkhamchuaxatnhan": `${SERVER_CONTEXT}/api/nurse/lichkhamchuaxatnhan`,
    "tinhtien": (id) => `${SERVER_CONTEXT}/api/nurse/tinhtien/${id}`,
    "thuockham": (id) => `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/thuoc`,
    "dichvukham": (id) => `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/dichvu`,
    "loaipayment": `${SERVER_CONTEXT}/api/nurse/hinhthucthanhtoan`,
    "thanhtoan": `${SERVER_CONTEXT}/api/nurse/thanhtoan`,
    "hoadon": (id) => `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/hoadon`,
    "thanhtoanthanhcong": (id) => `${SERVER_CONTEXT}/api/nurse/thanhtoan/${id}`,
    "xacnhanbacsi": (id) => `${SERVER_CONTEXT}/api/nurse/phieukham/${id}`,
    "huylich": (id) => `${SERVER_CONTEXT}/api/appointments/${id}`,
    "laybacsikhambenh": (id) => `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/bacsi`,
    // user
    "user": `${SERVER_CONTEXT}/api/users`,
    "update-user": `${SERVER_CONTEXT}/api/user/update`,
    "update-avatar": `${SERVER_CONTEXT}/api/user/changeavatar`,
    "cacphieucandanhgia": `${SERVER_CONTEXT}/api/benhnhan/danhgia`,
    "laynguoidung" :(username) =>`${SERVER_CONTEXT}/api/laynguoidung/${username}`,



}
export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER

});