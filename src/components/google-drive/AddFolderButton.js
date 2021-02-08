import React from 'react'
import { Button } from 'react-bootstrap'

function AddFolderButton() {
    function openModal(){

    }
    return (
        <Button onClick={openModal} variant="outline-success" size="sm">
            Open Folder
        </Button>
    )
}

export default AddFolderButton
