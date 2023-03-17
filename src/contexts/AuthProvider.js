import { useState, useEffect, createContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = function(props) {
    const [user, setUser] = useState({
        loggedIn: false
    })
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    async function login() {
        const result = await signInWithPopup(auth, provider)
    }

    async function logout() {
        const result = await signOut(auth)
        console.log(result)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                userData.loggedIn = true
                setUser(userData)
            } else {
                setUser({
                    loggedIn: false
                })
            }
        })
    }, [])

    const value = {
        login,
        logout,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}