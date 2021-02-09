import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

function AddFolderButton() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const { currentUser } = useAuth()

    function openModal(){
        setOpen(true)
    }

    function closeModal(){
        setOpen(false)
    }

    function handleSubmit(e){
        e.preventDefault()

        // Create a folder in the database
        database.folders.add({
            name: name,
            userId: currentUser.uid
        })

        setName("")
        closeModal()
    }

    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddFolderButton
