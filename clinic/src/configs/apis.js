import axios from "axios";
import cookie from "react-cookies";


const SERVER_CONTEXT = "/Clinnic";
// const SERVER = "http://localhost:8080";
const SERVER = "http://localhost:8900";

export const endpoints = {

    "medicines": `${SERVER_CONTEXT}/api/mediciens/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/register`,
    "dangky": `${SERVER_CONTEXT}/api/appointments`,
    "datlai": `${SERVER_CONTEXT}/api/appointments`,
    // "xoa": `${SERVER_CONTEXT}/api/appointments/{id}`
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