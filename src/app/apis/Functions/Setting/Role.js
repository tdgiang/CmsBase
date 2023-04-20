/* eslint-disable handle-callback-err */
import { PostData, GetURL } from '../../helpers'
import url from '../../url'

export const getListRole = async (body) =>
    PostData(url.urlGetListRole, body)
        .then((res) => res)
        .catch((err) => null)

export const createRole = async (body) =>
    PostData(url.urlCreateRole, body)
        .then((res) => res)
        .catch((err) => null)

export const updateRole = async (body) =>
    PostData(url.urlUpdateRole, body)
        .then((res) => res)
        .catch((err) => null)

export const detailRole = async (id, body) =>
    GetURL(`${url.urlDetailRole}/${id}`, body)
        .then((res) => res)
        .catch((err) => null)

export const deleteRole = async (body) =>
    PostData(url.urlDeleteRole, body)
        .then((res) => res)
        .catch((err) => null)

export const changeStatusRole = async (body) =>
    PostData(url.changeStatusRole, body)
        .then((res) => res)
        .catch((err) => null)
