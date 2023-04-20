/* eslint-disable handle-callback-err */
import { PostData, GetURL } from '../../helpers'
import url from '../../url'

export const getListEmployees = async (body) =>
    PostData(url.urlGetListEmployee, body)
        .then((res) => res)
        .catch((err) => null)

export const urlGetListCustomerSetting = async (body) =>
    PostData(url.urlGetListCustomerSetting, body)
        .then((res) => res)
        .catch((err) => null)

export const createEmployee = async (body) =>
    PostData(url.urlCreateEmployee, body)
        .then((res) => res)
        .catch((err) => null)

export const updateEmployee = async (body) =>
    PostData(url.urlUpdateEmployee, body)
        .then((res) => res)
        .catch((err) => null)

export const detailEmployee = async (id, body) =>
    GetURL(`${url.urlDetailEmployee}/${id}`, body)
        .then((res) => res)
        .catch((err) => null)

export const deleteEmployee = async (body) =>
    PostData(url.urlDeleteEmployee, body)
        .then((res) => res)
        .catch((err) => null)

export const changeStatusEmployee = async (body) =>
    PostData(url.changeStatusEmployee, body)
        .then((res) => res)
        .catch((err) => null)
