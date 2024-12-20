import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider } from "../firebase"
import { Link, useNavigate  } from "react-router-dom"
import { useState } from "react"

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const nav = useNavigate();

    const manageSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('Signed In Successfully')
            nav('/TaskLogs')
            
        } catch (error) {
            setError(error)
            }
        }

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, email, password)
            alert('Signed In Successfully')
            nav('/TaskLogs')
            
        } catch (error) {
            setError (error)
        }
    }

    return (
        <>  
            <h3>Sign In</h3>
                <form onSubmit = {manageSignIn}>
                    <input type = "email" required placeholder = "user@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type = "password" required placeholder = "user@email.com" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type = "submit">Sign In </button>
                </form>

                <button onClick = {handleSignInWithGoogle}> Sign In with Google </button>

                {error && <p> {error} </p>}
                <p>Don't have an account? <Link to = "/SignUp"> Sign Up Here</Link></p>
        </>
    )
}

export default SignIn