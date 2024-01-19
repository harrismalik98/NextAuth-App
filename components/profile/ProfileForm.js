import { useRef } from 'react';
import classes from './ProfileForm.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';


function ProfileForm() {

  const router = useRouter();
  const formRef = {
    newPassword: useRef(),
    oldPassword: useRef()
  };

  const formSubmitHandler = async(event) => {
    event.preventDefault();

    const formData = {};

    for(const key in formRef)
    {
      formData[key] = formRef[key].current.value;
    }

    try
    {
      const {data} = await axios.patch("/api/user/change-password",formData);

      for(const key in formRef)
      {
        formRef[key].current.value = "";
      }

      toast.success(data.message);
      router.replace("/");
    }
    catch(error)
    {
      toast.error(error.response.data.message || "Please try again!");
    }
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={formRef.newPassword}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={formRef.oldPassword}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
