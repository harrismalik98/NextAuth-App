import Link from 'next/link';
import classes from './MainNavigation.module.css';
import { signOut, useSession } from 'next-auth/react';

function MainNavigation() {

  const { data: session, status } = useSession()
  const loading = status === "loading";

  const logoutHandler = () => {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {
            !session && !loading && (<li>
              <Link href='/auth'>Login</Link>
            </li>)
          }
          {
            session && (<li>
              <Link href='/profile'>Profile</Link>
            </li>)
          }
          {
            session && (<li>
              <button onClick={logoutHandler}>Logout</button>
            </li>)
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
