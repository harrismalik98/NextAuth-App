import { getSession } from 'next-auth/react';
import AuthForm from '../components/auth/AuthForm';

function AuthPage() {

  return <AuthForm />;
}



export const getServerSideProps = async(context) => {
  const session = await getSession({req: context.req});

  if(session)
  {
    return{
      redirect:{
        destination: "/",
        permanent: false,
      }
    }
  }
  else
  {
    return{
      props:{},
    }
  }
  
} 
export default AuthPage;
