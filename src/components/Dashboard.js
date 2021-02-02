import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
    const [error, setError] = useState('')

    const { currentUser } = useAuth()

    return (
        <div>
            <Card className="mt-4">
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
                <Button variant="link">
                    Log Out
                </Button>
            </div>
        </div>
    )
}

export default Dashboard
