import React, { useState, useEffect } from 'react'

import ToolUserView from './View'
import useDebounce from 'app/hooks/useDebounce'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import KEY from 'app/assets/Key'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import {
    getListEmployees,
    deleteEmployee,
    updateEmployee,
    changeStatusEmployee,
} from 'app/apis/Functions/Setting/Employee'
import { getDropDownGroup } from 'app/apis/Functions/dropdown'

const ToolNotificate = (props) => {
    const [txtSearch, setTxtSearch] = useState('')
    const searchDebount = useDebounce(txtSearch, 1000)
    const [changeActive, setChangeActive] = useState(1)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize] = useState(10)
    const [totalRecords, setTotalRecord] = useState(0)
    const [listSelected, setListSelected] = useState([])
    const history = useHistory()
    const [data, setData] = useState([])
    const [status, setStatus] = useState(null)
    const [userGroup, setUserGroup] = useState(null)
    const [listStatus, setListStatus] = useState([
        {
            id: 1,
            name: 'Hiển thị',
            value: 1,
        },
        {
            id: 2,
            name: 'Khóa',
            value: 2,
        },
    ])
    const [listUserGroup, setListUserGroup] = useState([])
    useEffect(() => {
        //getListUserGroup()
    }, [])

    useEffect(() => {
        // getData()
    }, [searchDebount, pageIndex, status, userGroup])

    const handeChangeActive = async (id, status_id) => {
        props.showLoading()
        const res = await changeStatusEmployee({ id, status_id })

        props.hideLoading()
        if (res.data.code == 200) {
            getData()
            toast.success('Thay đổi trạng thái thành công!', {
                theme: 'colored',
            })
        } else {
            toast.error('Thay đổi trạng thái thất bại!', {
                theme: 'colored',
            })
        }
    }

    const getData = async () => {
        // props.showLoading()
        // const res = await getListEmployees({
        //     page_no: 1,
        //     page_size: 10,
        //     full_name: searchDebount,
        //     status: status != 'null' ? status : null,
        //     user_group_id: userGroup != 'null' ? userGroup : null,
        // })
        // props.hideLoading()
        // if (res.data.code == 200 && res.data.data) {
        //     const newList = res.data.data.data.map((e, i) => {
        //         return { ...e, index: i + pageIndex * pageSize + 1 }
        //     })
        //     setData(newList)
        //     setTotalRecord(res.data.data.total_elements)
        // } else if (res.data.code == 401) {
        //     localStorage.removeItem(KEY.API_TOKEN)
        //     setTimeout(() => {
        //         history.push('/')
        //     }, 1000)
        // } else {
        //     toast.error('Lấy danh sách thất bại!', {
        //         theme: 'colored',
        //     })
        // }
    }

    const removeItem = async (id) => {
        props.showLoading()
        const res = await deleteEmployee({ id: id })
        props.hideLoading()
        if (res.data.code == 200) {
            getData()
            toast.success('Xoá Người dùng thành công!', {
                theme: 'colored',
            })
        } else if (res.data.code == 401) {
            localStorage.removeItem(KEY.API_TOKEN)
            setTimeout(() => {
                history.push('/')
            }, 1000)
        } else {
            toast.error('Xoá Người dùng thất bại!', {
                theme: 'colored',
            })
        }
    }
    const getListUserGroup = async () => {
        props.showLoading()
        const res = await getDropDownGroup({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            const temp = res.data.data.map((e) => {
                return { ...e, value: e.id }
            })
            setListUserGroup(temp)
        }
    }

    return (
        <ToolUserView
            data={data}
            removeItem={removeItem}
            setTxtSearch={setTxtSearch}
            pageIndex={pageIndex}
            changeActive={changeActive}
            setChangeActive={setChangeActive}
            setPageIndex={setPageIndex}
            handeChangeActive={handeChangeActive}
            totalRecords={totalRecords}
            setListSelected={setListSelected}
            listSelected={listSelected}
            listStatus={listStatus}
            listUserGroup={listUserGroup}
            setStatus={setStatus}
            setUserGroup={setUserGroup}
            status={status}
            userGroup={userGroup}
        />
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(
    ToolNotificate
)
