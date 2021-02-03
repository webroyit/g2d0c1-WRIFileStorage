import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
    const history = useHistory();
    const { currentUser, logout } = useAuth()

    const [error, setError] = useState('')

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Something went wrong when logging out')
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <strong>Email: </strong> {currentUser.email}
                    <Link className="btn btn-primary w-100 mt-3" to="/update-profile">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    )
}

export default Dashboard
