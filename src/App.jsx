import { useEffect, useState } from 'react'
import ListTodos from './components/ListTodos'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <ListTodos user={user} /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
