import React from 'react'
import { Container } from 'react-bootstrap'
import { useFolder } from '../hooks/useFolder'

import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'

function Dashboard() {
    const { folder } = useFolder("TgiQEySLV7OPo4rMV1eV")
    console.log(folder)

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
