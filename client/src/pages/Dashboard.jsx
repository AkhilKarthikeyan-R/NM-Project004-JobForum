import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [search]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs?search=${search}`);
      setJobs(res.data);
    } catch (err) {
      alert('Failed to fetch jobs');
    }
  };

  const addToFavorites = async (jobId) => {
    try {
      await axios.post('http://localhost:5000/api/favorites', {
        userId: user.id,
        jobId: jobId,
      });
      setMsg('Job added to favorites!');
      setTimeout(() => setMsg(''), 2000);
    } catch (err) {
      setMsg('Login to add favorites');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-20 flex flex-col items-center ml-20">
      
      <div className="w-full max-w-xl flex flex-col items-center mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Available Jobs</h2>
        <input
          type="text"
          placeholder="Search jobs..."
          className="input input-bordered w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {msg && <div className="alert alert-info mb-6 w-full max-w-xl">{msg}</div>}

      
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          w-full 
          max-w-7xl 
          mx-auto
          justify-items-center
        "
      >
        {jobs.length === 0 ? (
          <p className="col-span-full text-center">No jobs found.</p>
        ) : (
          jobs.map(job => (
            <div
              key={job._id}
              className="card bg-white shadow-md p-6 rounded-lg"
              style={{ maxWidth: '350px', width: '100%' }}
            >
              <h3 className="text-xl font-bold text-blue-800">{job.title}</h3>
              <p className="text-md font-semibold text-gray-700 mt-1">{job.company}</p>
              <p className="mt-2 text-black">{job.description}</p>
              {job.location && <p className="text-sm text-gray-600 mt-1">📍 {job.location}</p>}
              {job.salary && <p className="text-sm text-gray-600 mt-1">💰 Salary: ₹{job.salary}</p>}
              {job.website && (
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline mt-2 inline-block"
                >
                  Apply / Visit Website
                </a>
              )}
              <button
                className="btn btn-sm btn-primary mt-4"
                onClick={() => addToFavorites(job._id)}
              >
                Add to Favorites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
