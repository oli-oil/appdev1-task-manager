import { createUserWithEmailAngPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link } from "react-router-dom"
import { useState } from "react"

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState (null);

    const manageSignUp = async () => {
        try {
            await createUserWithEmailAngPassword(auth, email, password)
            alert('User created Successfully')
            setEmail('')
            setPassword('') 
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <h3>Sign Up</h3>
            <form onSubmit = {() => {manageSignUp}}>
                <input type = "email" required placeholder = "user@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type = "password" required placeholder = "user@email.com" onChange={(e) => {setPassword(e.target.value)}}/>
                <button type = "submit">Sign Up </button>
                {/* <button type = "submit "onClick={manageSignUp}>Sign Up </button> */}
            </form>

            {error && <p> {error} </p>}
            <p>Already have an account? <Link to = "/SignIn"> Sign In Here </Link></p>
        </>
    )
}

export default SignUp