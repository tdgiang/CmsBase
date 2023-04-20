import React from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { toast } from 'react-toastify'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'

function UploadButtons(props) {
    const { images, onFileChange, title, disable, isRequited = false } = props

    const upLoadImage = async (event) => {
        const res = await apiUploadFile(
            createFormData(event.target.files[0], {})
        )

        if (res.data.status == 200 && res.data.data) {
            onFileChange(res.data.data[0].url)
            toast.success('Upload ảnh thành công!', {
                theme: 'colored',
            })
        } else {
            toast.error('Upload ảnh thất bại!', {
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
            <Typography color="textSecondary">
                {title}
                {isRequited ? <span style={{ color: 'red' }}>*</span> : null}
            </Typography>
            <input
                accept="image/png, image/gif, image/jpeg, image/jpg"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={upLoadImage}
                type="file"
            />
            <label htmlFor="contained-button-file">
                {images ? (
                    <img
                        src={images}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            cursor: 'pointer',
                        }}
                    />
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
                        disabled={disable && disable}
                    >
                        <PhotoCamera />
                    </IconButton>
                )}
            </label>
        </div>
    )
}

export default UploadButtons
