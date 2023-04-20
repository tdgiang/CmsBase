import React, { useState } from 'react'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { toast } from 'react-toastify'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

function UploadButtons(props) {
    const { file, onFileChange } = props

    const [loading, setLoading] = useState(false)

    const upLoadImage = async (event) => {
        setLoading(true)
        const res = await apiUploadFile(
            createFormData(event.target.files[0], {})
        )
        setLoading(false)

        if (res.data.status == 200 && res.data.data) {
            onFileChange(res.data.data[0].url)
            toast.success('Upload ảnh thành công!', {
                theme: 'colored',
            })
        } else {
            toast.success('Upload ảnh thất bại!', {
                theme: 'colored',
            })
        }
    }

    const createFormData = (photo, body) => {
        const data = new FormData()
        Object.keys(body).forEach((key) => {
            data.append(key, body[key])
        })
        if (photo) {
            data.append('files', photo)
        }
        return data
    }

    return (
        <div>
            <input
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={upLoadImage}
                type="file"
            />
            <label htmlFor="contained-button-file">
                {file ? (
                    <div
                        style={{
                            width: 'auto',
                            borderRadius: 5,
                            cursor: 'pointer',
                        }}
                    >
                        {file.slice(0, 30)}...
                    </div>
                ) : (
                    <IconButton
                        style={{
                            width: 100,
                            height: 100,

                            borderRadius: 5,
                            border: '1px  dashed gray ',
                        }}
                        color="primary"
                        component="span"
                    >
                        {loading ? (
                            <CircularProgress size={18} />
                        ) : (
                            <CloudUploadIcon />
                        )}
                    </IconButton>
                )}
            </label>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(
    UploadButtons
)
