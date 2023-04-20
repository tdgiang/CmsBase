import React from 'react'
import { apiGetInfor, apiLogin, apiLogout } from 'app/apis/Functions/users'
import KEY from 'app/assets/Key'
import { MatxLoading } from 'app/components'
import axios from 'axios.js'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorageService'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000

    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem(KEY.API_TOKEN, accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem(KEY.API_TOKEN)
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { t } = useTranslation()
    const login = async (username, password) => {
        const res = await apiLogin({
            username,
            password,
        })
        if (res.status === 200) {
            if (res.data.code == 200 && res.data.data) {
                localStorageService.setItem(KEY.API_TOKEN, res.data.data.token)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: { ...res.data.data },
                    },
                })
                return true
            } else {
                toast.error(t(res.data.error), {
                    theme: 'colored',
                })
            }
            return false
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
        return false
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = async () => {
        setSession(null)
        const res = await apiLogout({})
        window.localStorage.removeItem(KEY.API_TOKEN)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = window.localStorage.getItem(KEY.API_TOKEN)
                // if (accessToken && isValidToken(accessToken))
                if (accessToken) {
                    const res = await apiGetInfor({})
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: { ...res.data.data },
                        },
                    })
                    // if (res.data.code == 200 && res.data.data) {
                    //     dispatch({
                    //         type: 'INIT',
                    //         payload: {
                    //             isAuthenticated: true,
                    //             user: { ...res.data.data },
                    //         },
                    //     })
                    // }
                    // else {
                    //     localStorageService.setItem(KEY.API_TOKEN, null)
                    //     dispatch({
                    //         type: 'INIT',
                    //         payload: {
                    //             isAuthenticated: false,
                    //             user: null,
                    //         },
                    //     })
                    // }
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
