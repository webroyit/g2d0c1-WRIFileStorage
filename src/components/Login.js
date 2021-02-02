import React, { useRef, useState } from 'react'
import { Form, Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const {  } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        
    }

    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h2 className="text-center">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
