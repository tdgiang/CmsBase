import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'
import { toast } from 'react-toastify'
import { uploadBase64 } from 'app/apis/Functions/Upload'

class Signature extends Component {
    // state = { trimmedDataURL: null }
    sigPad = {}
    clear = () => {
        this.sigPad.clear()
    }
    trim = async () => {
        const response = await uploadBase64({
            imageData: this.sigPad
                .getTrimmedCanvas()
                .toDataURL('image/png')
                .substring(22),
        })
        if (response.data.code === 'OK' && response.data.data) {
            this.props.onFileChange(response.data.data.url)
            toast.success('Upload ảnh chữ ký thành công !', {
                theme: 'colored',
            })
        } else {
            //That bai
            toast.error('Upload ảnh chữ ký thất bại !', {
                theme: 'colored',
            })
        }
    }
    render() {
        // let { trimmedDataURL } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.sigContainer}>
                    <h5>Tạo chữ ký</h5>
                    <SignaturePad
                        canvasProps={{ className: styles.sigPad }}
                        ref={(ref) => {
                            this.sigPad = ref
                        }}
                    />
                    {!this.props.logo ? (
                        <div>
                            <div className={styles.signButton}>
                                <button
                                    className={styles.buttons}
                                    onClick={this.clear}
                                >
                                    Ký lại
                                </button>
                                <button
                                    className={styles.buttons}
                                    onClick={this.trim}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}

export default React.memo(Signature)
