import { useEffect, useState } from 'react';
import classes from './StartingPage.module.css';
import { getSession } from 'next-auth/react';

function StartingPageContent() {
  // Show Link to Login page if NOT auth
  const [login, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(()=> {

    getSession()
    .then((session)=> {
      if(session)
      {
        setUserEmail(session.user.email);
        setLogin(true);
      }
    })

  },[])

  return (
    <section className={classes.starting}>
      <h1>Welcome to Next-Auth!</h1>
      <h2>{login && userEmail}</h2> 
    </section>
  );
}

export default StartingPageContent;
