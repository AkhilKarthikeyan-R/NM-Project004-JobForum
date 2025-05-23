import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, logout }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-base-200 shadow-md bg-white">
      <div className="navbar px-6 max-w-screen-xl mx-auto">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">JOB FORUM</Link>

        <div className="flex-1"></div>

        <div className="flex gap-4 items-center">
          <Link to="/" className="btn btn-ghost text-black">Jobs</Link>
          {user?.role === 'employer' && (
            <>
              <Link to="/post-job" className="btn btn-ghost text-black">Post Job</Link>
              <Link to="/my-jobs" className="btn btn-ghost text-black">My Jobs</Link>
            </>
          )}
          {user && (
            <Link to="/favorites" className="btn btn-ghost text-black">Favorites</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/signup" className="btn btn-outline btn-primary">Sign Up</Link>
            </>
          ) : (
            <button className="btn btn-error" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
