import React, { useState } from 'react';
import axios from 'axios';

export default function Postjob({ user }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    website: '',
    company: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', {
        ...form,
        employerId: user.id,
        salary: Number(form.salary)
      });
      setMsg('Job posted successfully!');
      setForm({
        title: '',
        description: '',
        location: '',
        salary: '',
        website: '',
        company: ''
      });
    } catch (err) {
      setMsg('Failed to post job');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center pt-24 bg-base-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"  >
        <h2 className="text-2xl mb-4 text-center font-semibold text-black">Post a Job</h2>
        {msg && <div className="alert alert-info mb-4">{msg}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title" w-full
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
          />
          <input
            type="url"
            name="website"
            placeholder="Website / Apply Link"
            value={form.website}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary mt-2">Post Job</button>
        </form>
      </div>
    </div>
  );
}
