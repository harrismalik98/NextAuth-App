import { useRef, useState } from 'react';
import classes from './AuthForm.module.css';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import axios from 'axios';
import toast from 'react-hot-toast';

const createUser = async(userData) =>{
  const {data} = await axios.post("/api/auth/signup", userData);
  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const userAuth = {
    email: useRef(),
    password: useRef()
  };

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }


  const submitHandler = async(event) => {
    event.preventDefault();

    const userData = {};

    for(const key in userAuth)
    {
      userData[key] = userAuth[key].current.value;
    }
    // console.log(userData);

    if(isLogin)
    {
        const result = await signIn('credentials', { redirect:false, email:userData.email, password: userData.password});
        if(!result.error)
        {
          toast.success("Login Successful")
          router.replace("/");
        }
        else
        {
          toast.error( result.error ||"Login Failed! Please try again.")
        }
    }
    else
    {
      try
      {
        const result = await createUser(userData);
        toast.success(result.message);
        setIsLogin(true);
      }
      catch(error)
      {
        toast.error(error.response.data.message || "Please try again!");
      }
    }

    // For clearing the input fields.
    for(const key in userAuth)
    {
      userAuth[key].current.value = "";
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={userAuth.email}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={userAuth.password}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
