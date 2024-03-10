import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [formData, setFormData]= useState({});
  const [error, setError]= useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

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
      setLoading(true);
  
      const res= await fetch("/api/auth/signup", {
          method : "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData),
        } 
      );
       const data=await res.json();
     
       if(data.success === false ){
        setLoading(false);
        setError(data.message);
        return;
       }
       setLoading(false);
       setError(null);
       navigate('/sign-in');
        console.log(data);
        

    } catch(error){
      setLoading(false);
      setError(error.message);
    }
 
  }
  // console.log(formData);

  return (
    <div className='max-w-xl p-5 mx-auto' >
          <h1 className='text-2xl text-center font-bold my-7' >SignUp </h1>
          <form onSubmit={handelSubmit} className='flex flex-col gap-4' >
              <input type='text' placeholder='username' 
              className='border rounded-md  p-3' id="username" onChange={handelChange}/>
               <input type='text' placeholder='email' 
              className='border rounded-md  p-3' id="email" onChange={handelChange}/>
               <input type='password' placeholder='password'onChange={handelChange} 
              className='border rounded-md p-3' id="password" />
              <button disabled={loading}
              className='bg-slate-600 p-3 uppercase text-white rounded-md hover:opacity-90 ' >
              { loading ? "Loading" : "Sign Up" } </button>
          </form>
          <div className=' flex font-medium' >
              <p>Have an account ?</p>
              <Link to={"/sign-in"} className='text-blue-700 px-3 hover:text-blue-800' >Sign in</Link>
          </div>
          {error &&<p className='text-red-600 mt-3' >{error} </p> }
    </div>
  )
}

export default SignUp
