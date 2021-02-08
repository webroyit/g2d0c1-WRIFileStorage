import React from 'react'
import { Container } from 'react-bootstrap'

import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'

function Dashboard() {
    return (
        <div>
            <Navbar />
            <Container fluid>
                <AddFolderButton />
            </Container>
        </div>
    )
}

export default Dashboard
