/* eslint-disable handle-callback-err */
import { PostData, GetData, PostLogin } from '../helpers'
import url from '../url'

export const apiLogin = async (body) =>
    PostLogin(url.urlLogin, body)
        .then((res) => res)
        .catch((err) => null)

export const apiLogout = async (body) =>
    PostData(url.urlLogout, body)
        .then((res) => res)
        .catch((err) => null)

export const apiChangePass = async (body) =>
    PostData(url.urlChangePass, body)
        .then((res) => res)
        .catch((err) => null)

export const apiGetOTP = async (body) =>
    PostLogin(url.urlGetOTP, body)
        .then((res) => res)
        .catch((err) => null)

export const apiConfirmOTP = async (body) =>
    PostLogin(url.urlConfirmOTP, body)
        .then((res) => res)
        .catch((err) => null)

export const apiConfirmPass = async (body) =>
    PostLogin(url.urlConfirmPass, body)
        .then((res) => res)
        .catch((err) => null)

export const apiGetInfor = async (body) =>
    GetData(url.urlDetailUser, body)
        .then((res) => res)
        .catch((err) => null)

export const apiUploadUser = async (body) =>
    PostData(url.urlUpdateUser, body)
        .then((res) => res)
        .catch((err) => null)
