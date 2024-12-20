import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

function SignOut () {

    const nav = useNavigate  ();

    const manageSignOut = async () => {
        await signOut(auth)
        alert('User Signed Out')
        nav('/')
    }

    return (
        <>
            <button onClick={manageSignOut}> Sign Out </button>
        </>
    )
}

export default SignOut