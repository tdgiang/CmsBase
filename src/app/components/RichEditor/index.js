import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { apiUploadFile } from 'app/apis/Functions/Upload.js'
import { toast } from 'react-toastify'

export default function App(props) {
    const editorRef = useRef(null)

    const onChange = (content) => {
        props.setDesc(content)
    }

    return (
        <>
            <Editor
                disabled={props.disabled ? props.disabled : false}
                onEditorChange={onChange}
                value={props.desc}
                apiKey="ffee9d0b368ca58a31c031dba2bad0bff04629eb837c11bc867b8c422250eb75"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    height: 500,
                    menubar: false,
                    selector: 'textarea#full-featured',
                    plugins:
                        'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor  insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker  textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',

                    mobile: {
                        plugins:
                            'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
                    },
                    menu: {
                        tc: {
                            title: 'Comments',
                            items: 'addcomment showcomments deleteallconversations',
                        },
                    },
                    menubar: 'file edit view insert format tools table tc help',
                    toolbar:
                        'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview  print |image  link anchor codesample | showcomments addcomment',

                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,

                    images_upload_handler: async function (
                        blobInfo,
                        success,
                        failure
                    ) {
                        const body = new FormData()
                        body.append(
                            'files',
                            blobInfo.blob(),
                            blobInfo.filename()
                        )
                        const res = await apiUploadFile(body)
                        if (res.data.status == 200 && res.data.data) {
                            success(res.data.data[0].url)
                        } else {
                            toast.error('Upload ảnh thất bại!', {
                                theme: 'colored',
                            })
                        }
                    },

                    importcss_append: true,

                    template_cdate_format:
                        '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format:
                        '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                    // quickbars_selection_toolbar:
                    //     'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    tinycomments_mode: 'embedded',
                    content_style: '.mymention{ color: gray; }',
                    content_css: 'default',
                    mentions_selector: '.mymention',
                    mentions_item_type: 'profile',
                }}
            />
        </>
    )
}
