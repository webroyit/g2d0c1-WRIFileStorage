import React, { useContext, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    

    useEffect(() => {
        // 'onAuthStateChanged' checks if the user is log in or not
        // This function return a method to unsubscribe from this listener
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        // Remove this listener when it is finish
        return unsubscribe
    }, [])
    
    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
