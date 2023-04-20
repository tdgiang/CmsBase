import React from 'react'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { apiUploadFile } from '../../apis/Functions/upload'
import { useSnackbar } from 'notistack'
import { showLoading, hideLoading } from '../../actions/loadingAction'
import { connect } from 'react-redux'

function UploadButtons(props) {
    const { images, onFileChange, title } = props

    const { enqueueSnackbar } = useSnackbar()

    const upLoadImage = async (event) => {
        createFormData(event.target.files)

        props.showLoading()
        const res = await apiUploadFile(createFormData(event.target.files))
        props.hideLoading()
        if (res.data.code == 'OK' && res.data.data) {
            onFileChange(res.data.data)
            enqueueSnackbar('Upload ảnh thành công!', { variant: 'success' })
        } else {
            enqueueSnackbar('Upload ảnh thất bại!', { variant: 'error' })
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
            <Typography color="textSecondary">{title}</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={upLoadImage}
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                {images.length > 0 ? (
                    images.map((item) => (
                        <img
                            src={item.url}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 5,
                                marginRight: 10,
                                cursor: 'pointer',
                            }}
                        />
                    ))
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
                        <PhotoCamera />
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
