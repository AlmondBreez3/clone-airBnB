import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/');
  }

  if (!ready) {
    return 'loading...';
  }

  //user값이 없으면
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

//1시간 53분 57초까지 봄
