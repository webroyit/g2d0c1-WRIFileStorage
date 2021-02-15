import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

import { storage } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth()

    function handleUpload(e) {
        // Get the first file
        const file = e.target.files[0]

        if (currentFolder == null || file == null) return

        // Set the folder and file path
        const filePath = currentFolder.path.length > 0
            ? `${currentFolder.path.join('/')}/${file.name}`
            : file.name

        // Save the file on firebase storage
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)
    }

    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
            <FontAwesomeIcon icon={faFileUpload} />
            <input
                type="file"
                onChange={handleUpload}
                style={{ opacity: 0, position: "absolute", left: "-9999px" }}/>
        </label>
    )
}

export default AddFileButton
