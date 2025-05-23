import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Myjobs({ user }) {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/employer/${user.id}`);
      setJobs(res.data);
    } catch (err) {
      setMsg('Failed to fetch your jobs');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      setMsg('Job deleted');
    } catch {
      setMsg('Failed to delete job');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold mb-6 ">My Posted Jobs</h2>
      {msg && <div className="alert alert-info mb-4">{msg}</div>}
      {jobs.length === 0 ? (
        <p className="text-gray-600">You have not posted any jobs yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="card bg-white shadow-md p-5 border rounded-lg relative">
              <h3 className="text-xl font-bold mb-1 text-black">{job.title}</h3>
              {job.company && <p className="text-sm text-gray-700 mb-1">Company: {job.company}</p>}
              {job.location && <p className="text-sm text-gray-600 mb-1">Location: {job.location}</p>}
              {job.salary && <p className="text-sm text-gray-600 mb-1">Salary: ₹{job.salary}</p>}
              <p className="text-gray-700 mt-2 text-black">{job.description}</p>
              {job.website && (
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 block"
                >
                  Visit Website
                </a>
              )}
              <button
                className="btn btn-sm btn-error absolute top-3 right-3"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
