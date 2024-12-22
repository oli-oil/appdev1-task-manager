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
            await signInWithPopup(auth, googleProvider)
            alert('Signed In Successfully')
            nav('/TaskLogs')
            
        } catch (error) {
            setError (error)
            }
    }

    return (
        <>  
            <h1>Sign In</h1>
                <form onSubmit = {manageSignIn}>
                    <input type = "email" required placeholder = "Enter Email Here" onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type = "password" required placeholder = "Enter Password Here" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type = "submit"> <span> Sign In </span> </button>
                </form>

                <button onClick = {handleSignInWithGoogle} className = "gButton"> <span>  Sign In with Google </span> </button>

                {error && <p> {error} </p>}
                <p>Don't have an account? <Link to = "/SignUp"> Sign Up Here</Link></p>
        </>
    )
}

export default SignIn