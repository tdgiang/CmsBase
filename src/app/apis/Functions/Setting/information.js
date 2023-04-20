import { PostData, GetData, PostLogin } from '../../helpers'
import url from '../../url'

export const getInforTCPH = async (body) =>
    GetData(url.informationTCPH, body)
        .then((res) => res)
        .catch((err) => null)
export const updateInforTCPH = async (body) =>
    PostData(url.updateTCPH, body)
        .then((res) => res)
        .catch((err) => null)
