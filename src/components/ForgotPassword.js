import React, { useRef, useState } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function ForgotPassword() {
    const history = useHistory()
    const emailRef = useRef()

    const {  } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default ForgotPassword
