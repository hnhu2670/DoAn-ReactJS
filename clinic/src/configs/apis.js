import axios from "axios";
import cookie from "react-cookies";


const SERVER_CONTEXT = "/Clinnic";
const SERVER = "http://localhost:8080";
// const SERVER = "http://localhost:8900";

export const endpoints = {

    "medicines": `${SERVER_CONTEXT}/api/mediciens/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/register`,
    "dangky": `${SERVER_CONTEXT}/api/appointments`,
    "datlai": `${SERVER_CONTEXT}/api/appointments`,
    "xoa": (id) => `${SERVER_CONTEXT}/api/appointments/${id}`,
    "login-google": `${SERVER_CONTEXT}/api/login-google/`,
    "doctor": `${SERVER_CONTEXT}/api/doctors`,
    "pro-doctor": (id) => `${SERVER_CONTEXT}/api/doctor/${id}`,
    "rating": (id) => `${SERVER_CONTEXT}/api/doctor/${id}/rating`,
    "user": `${SERVER_CONTEXT}/api/users`,
    "appointments": `${SERVER_CONTEXT}/api/appointments`,
    "shift": `${SERVER_CONTEXT}/api/doctor/shift`,
    "update-user": `${SERVER_CONTEXT}/api/user/update`,
    "update-avatar": `${SERVER_CONTEXT}/api/user/changeAvatar`,
    "isUser": `${SERVER_CONTEXT}/api/isUser/`,
    "up-password": `${SERVER_CONTEXT}/api/up-password/`,
    "addSchedule": `${SERVER_CONTEXT}/api/dangkylichlam`,
    // "lichkham": `${SERVER_CONTEXT}/api/doctor/lichkham`,
    "phieukham": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/${id}/phieukham`,
    // "phieukham": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/22/phieukham`,
    "lichkham": `${SERVER_CONTEXT}/api/doctor/lichkham`,
    "addSchedule": `${SERVER_CONTEXT}/api/dangkylichlam`,
    "lichkhamchuaxatnhan": `${SERVER_CONTEXT}/api/nurse/lichkhamchuaxatnhan`,
    "phieubenh": (id) => `${SERVER_CONTEXT}/api/doctor/khambenh/${id}/phieubenh`,
    "lichdangkyca1": `${SERVER_CONTEXT}/api/lichlamdangkyca1`,
    "lichdangkyca2": `${SERVER_CONTEXT}/api/lichlamdangkyca2`,
    "lichdangkyca3": `${SERVER_CONTEXT}/api/lichlamdangkyca3`,
    "dichvu": `${SERVER_CONTEXT}/api/service`,
    "khambenh": `${SERVER_CONTEXT}/api/doctor/khambenh`,
    "lichsukham": (id) => `${SERVER_CONTEXT}/api/doctor/lichsukham/${id}`,
    "thuoc": `${SERVER_CONTEXT}/api/medicines`,
    "toathuoc": (id) => `${SERVER_CONTEXT}/api/doctor/phieubenh/${id}/kethuoc`,
    "kethuoc": `${SERVER_CONTEXT}/api/doctor/phieubenh/kethuoc`,
    "thuockham": (id) =>  `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/thuoc`,
    "dichvukham": (id) =>  `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/dichvu`,
    "loaipayment": `${SERVER_CONTEXT}/api/nurse/hinhthucthanhtoan`,
    "thanhtoan": `${SERVER_CONTEXT}/api/nurse/thanhtoan`,
    "hoadon": (id) =>  `${SERVER_CONTEXT}/api/nurse/phieukham/${id}/hoadon`,
    "thanhtoanthanhcong": (id) => `${SERVER_CONTEXT}/api/nurse/thanhtoan/${id}`,






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