import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { toast } from 'react-toastify'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

function UploadFile(props) {
    const {
        file,
        onFileChange,
        html,
        title,
        desc = 'Tải file lên',
        isRequired,
        type,
        name,
        removeFile,
    } = props

    const [loading, setLoading] = useState(false)

    const upLoadImage = async (event) => {
        setLoading(true)
        const res = await apiUploadFile(
            createFormData(event.target.files[0], {})
        )
        setLoading(false)

        if (res.data.status == 200 && res.data.data) {
            onFileChange(res.data.data[0], type)
            toast.success('Upload file thành công!', {
                theme: 'colored',
            })
        } else {
            toast.error('Upload file thất bại!', {
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
        <div style={{ marginBottom: 20 }}>
            <div>
                {title}{' '}
                {isRequired ? <span style={{ color: 'red' }}>(*)</span> : null}
            </div>
            <input
                style={{ display: 'none' }}
                id={html}
                onChange={upLoadImage}
                type="file"
                accept=".pdf"
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor={html}>
                    <IconButton
                        style={{
                            width: 220,
                            height: 35,
                            marginRight: 20,
                            borderRadius: 5,
                            border: '1px solid #CCCCCC',
                            color: 'var(--color-primary)',
                        }}
                        component="span"
                    >
                        {loading ? (
                            <CircularProgress size={18} />
                        ) : (
                            <CloudUploadIcon />
                        )}
                        <div style={{ fontSize: 14, marginLeft: 20 }}>
                            {desc}
                        </div>
                    </IconButton>
                </label>

                {file && (
                    <div
                        style={{
                            width: 'auto',
                            borderRadius: 5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0 20px',
                        }}
                    >
                        {/* {file.slice(0, 30)}... */}
                        {name}
                        <div
                            style={{
                                color: 'red',
                                fontSize: 20,
                                cursor: 'pointer',
                            }}
                            onClick={() => removeFile(type)}
                        >
                            X
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadFile
