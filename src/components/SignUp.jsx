import React, { useState } from 'react'
import { Link } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError(`Failed to signup: ${error}`)
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <input type="email" placeholder='username ...' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password ...' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error}</p>}
            <p>Already have an account? <Link to="/signin">Login</Link></p>
        </div>
  )
}
