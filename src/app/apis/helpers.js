import axios from 'axios'
import KEY from '../assets/Key'
import localStorageService from 'app/services/localStorageService'

axios.defaults.timeout = 10000
export async function GetData(url, data) {
    const token = localStorageService.getItem(KEY.API_TOKEN)

    let myRequest = {
        method: 'get',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            ...data,
        },
        timeout: 30 * 1000,
        // withCredentials: true,
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function PostHaveKey(url, json, key) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-SECRET-KEY': key,
        },
        timeout: 30 * 1000,
        data: JSON.stringify(json),
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function GetHaveKey(url, data, key) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'get',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-SECRET-KEY': key,
        },
        timeout: 30 * 1000,
        params: {
            ...data,
        },
        // withCredentials: true,
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function GetURL(url, data) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'get',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        timeout: 30 * 1000,
        params: {
            ...data,
        },
        // withCredentials: true,
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function PostLogin(url, json) {
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 30 * 1000,
        data: JSON.stringify(json),
    }
    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
            }
            return err
        })
}

export async function PostData(url, json, isAuth = true) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        timeout: 30 * 1000,
        data: JSON.stringify(json),
    }
    console.log('myRequest', myRequest)

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function PostURL(url) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        timeout: 30 * 1000,
    }
    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function PostFormData(url, data) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
        timeout: 30 * 1000,
        data: data,
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}

export async function PostExportFile(url, json, name, isAuth = true) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        timeout: 30 * 1000,
        data: JSON.stringify(json),
    }
    return await axios(myRequest)
        .then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
                'download',
                `${name}_${json.from_date ? json.start_date : null}_${
                    json.end_date ? json.end_date : null
                }.xls`
            ) //or any other extension
            document.body.appendChild(link)
            link.click()
            return {
                data: {
                    code: 200,
                },
            }
        })
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 400,
                },
            }
            return err
        })
}

export async function PostNonToken(url, json, isAuth = true) {
    const token = localStorageService.getItem(KEY.API_TOKEN)
    let myRequest = {
        method: 'post',
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 30 * 1000,
        data: JSON.stringify(json),
    }

    return await axios(myRequest)
        .then((response) => response)
        .then((response) => response)
        .catch((error) => {
            const err = {
                message: 'error',
                status: error.request.status,
                data: {
                    code: 401,
                },
            }
            return err
        })
}
