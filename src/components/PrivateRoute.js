import React from 'react'
import { Route, Redirect } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    // Redirect the user to login page if they are not log in
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}

export default PrivateRoute
