import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Perks from '../Perks';
import { useState } from 'react';
import PhotosUploader from '../PhotosUploader';
import { useEffect } from 'react';
import AccountNav from '../AccountNav';

export default function PlacesFormPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      //update
      await axios
        .put('/places', {
          id,
          ...placeData,
        })
        .then(() => navigate('/account'));
    } else {
      await axios
        .post('/places', {
          placeData,
        })
        .then(() => navigate('/account'));
    }
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 rext-sm">
          title for your place.should be short and catchy as in ad
        </p>
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="title, for example:My lovely apartment"
        ></input>
        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 rext-sm">Address to this place</p>
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type="text"
          placeholder="address"
        />
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 rext-sm">more=better</p>
        <PhotosUploader
          addedPhotos={addedPhotos}
          onChange={setAddedPhotos}
        ></PhotosUploader>
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">Description of the place</p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">select all the perks</p>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm">house rules, etc</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <h2 className="text-2xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">
          add check in and out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
