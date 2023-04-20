import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import FullEditor from 'ckeditor5-build-full'
import { Grid, InputLabel } from '@material-ui/core'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'

function CKedittorComponents(props) {
    const { title, desc, handleChangeContent } = props
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData()
                    loader.file.then((file) => {
                        body.append('files', file)
                        apiUploadFile(body)
                            .then((res) => {
                                resolve({
                                    default: res.data.data[0].url,
                                })
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    })
                })
            },
        }
    }
    return (
        <>
            <Grid style={{ marginBottom: 20 }} item xs={12} sm={12}>
                <InputLabel style={{ paddingBottom: '5px' }}>
                    {title}
                </InputLabel>

                <CKEditor
                    editor={FullEditor}
                    // disabled={props.disabled ? true : false}
                    config={{
                        extraPlugins: [uploadPlugin],
                    }}
                    data={desc ? desc : ''}
                    onReady={(editor) => {
                        editor && editor.setData(desc ? desc : '')
                        // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                        const content = editor.getData()
                        handleChangeContent(content)
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                />
            </Grid>
        </>
    )
}

export default CKedittorComponents
