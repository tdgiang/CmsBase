/* eslint-disable handle-callback-err */
import { PostFormData, PostData } from '../helpers'
import url from '../url'

export const apiUploadFile = async (body) =>
    PostFormData(url.urlUploadFile, body)
        .then((res) => res)
        .catch((err) => null)

export const uploadBase64 = async (params) =>
    PostData(url.uploadBase64, params)
        .then((res) => res)
        .catch((err) => err)
