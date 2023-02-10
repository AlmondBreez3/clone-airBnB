import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);

  let { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return 'loading...';
  }

  //user값이 없으면
  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex  justify-center mt-4 gap-2 mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>
          My profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm mt-2">logout</button>
        </div>
      )}
    </div>
  );
}

//1시간 53분 57초까지 봄
