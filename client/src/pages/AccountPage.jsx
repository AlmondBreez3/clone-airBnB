import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return 'loading...';
  }

  //user값이 없으면
  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  return <div>account Page for {user.name}</div>;
}
