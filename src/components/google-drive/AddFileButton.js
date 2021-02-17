import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidV4 } from 'uuid'
import { Toast, ProgressBar } from 'react-bootstrap'

import { database, storage } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../hooks/useFolder'

function AddFileButton({ currentFolder }) {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currentUser } = useAuth()

    function handleUpload(e) {
        // Get the first file
        const file = e.target.files[0]

        if (currentFolder == null || file == null) return

        // Generate unique identifiers
        const id = uuidV4(0)

        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            {
                id: id,
                name: file.name,
                progress: 0,
                error: false
            }
        ])

        // Set the folder and file path
        const filePath = currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.join('/')}/${file.name}`
            : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

        // Save the file on firebase storage
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

       
        uploadTask.on('state_changed', snapshot => {
            // Get called repeatedly(For upload progress)

            // Get the percentage
            const progress = snapshot.bytesTransferred / snapshot.totalBytes

            // Show the percentage of the file being uploading
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }

                    return uploadFile
                })
            })
        }, () => {
            // For error
        }, () => {
            // After the upload is complete

            // Remove the bootstrap toast
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })

            // Get the URL of the image that was uploaded to firebase storage
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                // Save the url on firebase database
                database.files.add({
                   url: url,
                   name: file.name,
                   createAt:database.getCurrentTimestamp(),
                   folderId: currentFolder.id,
                   userId: currentUser.uid
               })
            })
        })
    }

    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-9999px" }}/>
            </label>
            {uploadingFiles.length > 0 && ReactDOM.createPortal(
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    maxWidth: '250px'
                }}>
                    {uploadingFiles.map(file => (
                        <Toast key={file.id}>
                            <Toast.Header closeButton={file.error} className="text-truncate w-100 d-block">
                                {file.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ProgressBar
                                    animated={!file.error}
                                    variant={file.error ? 'danger' : 'primary'}
                                    now={file.error ? 100 : file.progress * 100}
                                    label={
                                        file.error ? 'Error': `${Math.round(file.progress * 100)}%`
                                    } />
                            </Toast.Body>
                        </Toast>
                    ))}
                </div>,
                // Rendered this code in the body
                document.body
            )}
        </>
    )
}

export default AddFileButton
