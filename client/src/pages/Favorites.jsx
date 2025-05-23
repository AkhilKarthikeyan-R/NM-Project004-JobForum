import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/favorites/${user.id}`);
      setFavorites(res.data);
    } catch {
      setMsg('Failed to fetch favorites');
    }
  };

  const removeFavorite = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${user.id}/${jobId}`);
      setFavorites(favorites.filter(job => job._id !== jobId));
      setMsg('Removed from favorites');
      setTimeout(() => setMsg(''), 2000);
    } catch {
      setMsg('Failed to remove favorite');
    }
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto p-6 ml-40">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white ">My Favorite Jobs</h2>

      {msg && <div className="alert alert-info mb-6">{msg}</div>}

      {favorites.length === 0 ? (
        <p className="text-center">You have no favorite jobs.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(job => (
            <div key={job._id} className="card bg-white shadow-md p-6 rounded-lg w-full">
              <h3 className="text-xl font-bold text-blue-800">{job.title}</h3>
              <p className="mt-2 text-gray-800">{job.description}</p>
              {job.location && (
                <p className="mt-1 text-sm text-gray-500">📍 {job.location}</p>
              )}
              {job.salary && (
                <p className="mt-1 text-sm text-gray-500">💰 Salary:₹{job.salary}</p>
              )}
              <button
                className="btn btn-sm btn-error mt-4"
                onClick={() => removeFavorite(job._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
