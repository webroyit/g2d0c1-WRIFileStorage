import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

function AddFolderButton() {
    function openModal(){

    }
    return (
        <Button onClick={openModal} variant="outline-success" size="sm">
            <FontAwesomeIcon icon={faFolderPlus} />
        </Button>
    )
}

export default AddFolderButton
