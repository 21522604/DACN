import React, { useEffect, useRef } from "react";
import { Placeholder } from "react-bootstrap";
export default function CKeditor({ onChange, editorLoaded, name, data, Placeholder, init }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);
    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    initData={init}
                    config={Placeholder}
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={data}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    )
}