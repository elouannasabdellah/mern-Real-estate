import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {

  const [formData, setFormData]= useState({});
  // const [error, setError]= useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const dispatch = useDispatch();

  const {loading , error , currentUser}= useSelector((state)=> state.user);

  const handelChange=(e)=>{
      setFormData(
          {
            ...formData,
            [e.target.id]: e.target.value,
          }
      );
  }

  const handelSubmit= async (e)=>{

    try{

      e.preventDefault();
      // setLoading(true);  en a fait a la place de signInstart()
      dispatch(signInStart());
  
      const res= await fetch("/api/auth/signin", {
          method : "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData),
        } 
      );
       const data=await res.json();
     
       if(data.success === false ){
        // setLoading(false);
        dispatch(signInFailure(data.message));
        // setError(data.message);
        return;
       }
      //  setLoading(false);
      //  setError(null);
      dispatch(signInSuccess(data));
      //  navigate('/');
     
        console.log(data);
        

    } catch(error){
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
 
  }
  // console.log(formData);

  return (
    <div className='max-w-xl p-5 mx-auto' >
          <h1 className='text-2xl text-center font-bold my-7' >SignIn app </h1>
         
          <form onSubmit={handelSubmit} className='flex flex-col gap-4' >
               <input type='text' placeholder='email' 
              className='border rounded-md  p-3' id="email" onChange={handelChange}/>
               <input type='password' placeholder='password'onChange={handelChange} 
              className='border rounded-md p-3' id="password" />
              <button disabled={loading}
              className='bg-slate-600 p-3 uppercase text-white rounded-md hover:opacity-90 ' >
              { loading ? "Loading" : "Sign In" } </button>
              <OAuth/>
          </form>
          <div className=' flex font-medium' >
              <p>Don't Have an account ?</p>
              <Link to={"/sign-up"} className='text-blue-700 px-3 hover:text-blue-800' >Sign up</Link>
          </div>
          {error &&<p className='text-red-600 mt-3' >{error} </p> }
    </div>
  )
}

export default SignIn
