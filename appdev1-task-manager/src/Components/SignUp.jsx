import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { Link } from "react-router-dom"
import { useState } from "react"
import '../Design.css'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState (null);

    const manageSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert('User created Successfully')
            setEmail('')
            setPassword('') 
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit = {() => {manageSignUp}}>
                <input type = "email" required placeholder = "Enter Email Here" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type = "password" required placeholder = "Enter Password Here" onChange={(e) => {setPassword(e.target.value)}}/>
                <button type = "submit"> <span>Sign Up</span> </button>
                {/* <button type = "submit "onClick={manageSignUp}>Sign Up </button> */}
            </form>

            {error && <p> {error} </p>}
            <p>Already have an account? <Link to = "/SignIn" className = "link"> Sign In Here </Link></p>
        </>
    )
}

export default SignUp