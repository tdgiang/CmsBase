import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { apiUploadFile } from '../../apis/Functions/Upload'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { CircularProgress } from '@material-ui/core'
import { toast } from 'react-toastify'

function UploadMultipleFile(props) {
    const { file, onFileChange, title, html, desc, isRequired } = props

    const [loading, setLoading] = React.useState(false)

    const upLoadImage = async (event) => {
        setLoading(true)
        const res = await apiUploadFile(createFormData(event.target.files))
        setLoading(false)
        if (res.data.code == 'OK' && res.data.data) {
            onFileChange(res.data.data)
            toast.success('Upload file thành công!', {
                theme: 'colored',
            })
        } else {
            toast.error('Upload file thất bại!', {
                theme: 'colored',
            })
        }
    }

    const createFormData = (files) => {
        const data = new FormData()

        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i])
        }
        return data
    }

    return (
        <div>
            <div>
                {title}{' '}
                {isRequired ? <span style={{ color: 'red' }}>(*)</span> : null}
            </div>
            <input
                style={{ display: 'none' }}
                id={html}
                onChange={upLoadImage}
                multiple
                type="file"
                accept=".pdf"
            />

            <div>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {file?.length
                        ? file?.map((item) => (
                              <img
                                  src={item.url}
                                  style={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: 5,
                                      marginRight: 10,
                                      marginTop: 20,
                                      cursor: 'pointer',
                                  }}
                              />
                          ))
                        : null}
                </div>
            </div>
        </div>
    )
}

export default UploadMultipleFile
