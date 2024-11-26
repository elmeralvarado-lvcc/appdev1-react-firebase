import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            setError(`Error in signing in: ${error.message}`)
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/')
        } catch (error) {
            setError(`Error in signing with google: ${error.message}`)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='username ...' />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password ...' />
            <button onClick={handleSignIn}>Login</button> or
            <button onClick={handleSignInWithGoogle}>Login with Google</button>
            {error && <p>{error}</p>}
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}
