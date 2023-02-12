import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import { useState } from 'react';

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function uploadPhoto(ev) {
    const files = ev.target.files;
    console.log({ files });

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  return (
    <div>
      {action !== 'new' && (
        <div className="">
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
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type="text"
                placeholder={'Add using a link....jpg'}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl w-full"
                      src={'http://localhost:4000/uploads/' + link}
                      alt={'no image'}
                    />
                  </div>
                ))}
              <label className="h-32 flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
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
      )}
    </div>
  );
}
