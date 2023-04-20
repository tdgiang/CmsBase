import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'
import NewPassword from './NewPassword'
import ConfirmOTP from './ConfirmOTP'
import Introduce from './introduce/index'
const sessionRoutes = [
    {
        path: '/session/introduce',
        component: Introduce,
    },
    {
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/new-password',
        component: NewPassword,
    },
    {
        path: '/session/confirm-otp',
        component: ConfirmOTP,
    },

    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
