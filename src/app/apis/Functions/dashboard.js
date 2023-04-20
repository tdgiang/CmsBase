/* eslint-disable handle-callback-err */
import { PostData, GetURL } from '../helpers'
import url from '../url'

export const urlDashboard = async (body) =>
    GetURL(`${url.urlDashboard}`, body)
        .then((res) => res)
        .catch((err) => null)
