import React from 'react'
import { Container } from 'react-bootstrap'
import { useFolder } from '../hooks/useFolder'

import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'

function Dashboard() {
    const { folder } = useFolder()

    return (
        <div>
            <Navbar />
            <Container fluid>
                <AddFolderButton currentFolder={folder} />
            </Container>
        </div>
    )
}

export default Dashboard
