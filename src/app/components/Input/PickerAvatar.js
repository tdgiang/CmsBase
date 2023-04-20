import React from 'react'
import { Avatar, Typography, Badge } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { toast } from 'react-toastify'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'

function UploadButtons(props) {
    const { image, onFileChange } = props
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
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={upLoadImage}
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<PhotoCamera />}
                >
                    <Avatar
                        src={image}
                        style={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                        }}
                    />
                </Badge>
            </label>
        </div>
    )
}

export default UploadButtons
