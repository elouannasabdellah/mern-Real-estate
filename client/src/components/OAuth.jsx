import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
const OAuth = () => {
    const dispatch= useDispatch();
    const handelGoogleClick=async()=>{
       

        try{
            const provider= new GoogleAuthProvider()
            const auth= getAuth(app)

            const result= await signInWithPopup(auth,provider)
            const res= await fetch("api/auth/google", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({name:result.user.displayName,
                    email:result.user.email ,photo:result.user.photoURL})
            } )
            const data= await res.json()

            dispatch(signInSuccess(data));

        }catch(error){
            console.log("could not sign in with google", error)
        }
    }

  return (
        <button onClick={handelGoogleClick} type="button" className='bg-red-700 text-white p-3 rounded-md hover:opacity-90' >
            Continue with Google
        </button>
  )
}

export default OAuth
