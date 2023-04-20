const root = 'http://khaigiaapi.tasvietnam.vn:8889/api'

export default {
    urlLogin: `${root}/auth/adminLogin`,
    urlLogout: `${root}/bauth/branchLogout`,
    urlChangePass: `${root}/tcph/auth/tcphChangePass`,
    urlUpdateUser: `${root}/bauth/branchUpdateUserInfo`,
    urlDetailUser: `${root}/tcph/auth/getUserInfo`,
    urlGetOTP: `${root}/tcph/auth/sendCodeForget`,
    urlConfirmOTP: `${root}/tcph/auth/confirmCodeForget`,
    urlConfirmPass: `${root}/tcph/auth/changePassForget`,

    urlGetInfor: `${root}/tcph/auth/getUserInfo`,

    branchCommon: `${root}/dashboard/branchCommon`,
    dashboardReport: `${root}/dashboard/branchBenifit`,
}
