import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./Components/SignIn.jsx"
import SignUp from "./Components/SignUp.jsx"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import TaskLogs from "./Components/TaskLogs.jsx" 

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsubscribe;
  }, [])

  return (
    <>
       <Router>
        <Routes> 
          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/TaskLogs" element={user ? <TaskLogs/> : <SignIn />} />
        </Routes>
       </Router>
    </>
  )
}

export default App
