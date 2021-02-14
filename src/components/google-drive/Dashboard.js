import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'

import { useFolder } from '../hooks/useFolder'
import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton'
import Folder from './Folder'
import FolderBreadcrumbs from './FolderBreadcrumbs'

function Dashboard() {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders } = useFolder(folderId, state.folder)

    return (
        <div>
            <Navbar />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <FolderBreadcrumbs currentFolder={folder} />
                    <AddFolderButton currentFolder={folder} />
                </div>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(childFolder => (
                            <div
                                key={childFolder.id}
                                style={{ maxWidth: '250px' }}
                                className="p-2"
                            >
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Dashboard
