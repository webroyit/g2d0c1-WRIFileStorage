import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

function AddFileButton({ currentFolder }) {

    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
            <FontAwesomeIcon icon={faFileUpload} />
            <input
                type="file"
                style={{ opacity: 0, position: "absolute", left: "-9999px" }}/>
        </label>
    )
}

export default AddFileButton
