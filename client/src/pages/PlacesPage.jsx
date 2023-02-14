import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AccountNav from '../AccountNav';

export default function PlacesPage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
          <h2 className="text-center">List of my Places</h2>
          <div className="text-center mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={'/account/places/' + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-2"
                >
                  <div className="w-32 h-32 bg-gray-300">
                    {place?.addedPhotos && place?.addedPhotos.length > 0 && (
                      <img src={place.addedPhotos[0]} alt="/" />
                    )}
                  </div>
                  <h2 className="text-xl">{place.title}</h2>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
